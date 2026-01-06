import { describe, expect, test, it, beforeEach, vi, afterEach } from 'vitest';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from 'generated/prisma/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-off-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Authenticate Use Case', () => {

    beforeEach(async() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id: 'gym-01',
            title: 'javaScript Gym',
            description: '',
            phone: '',
            latitude: -23.7137429,
            longitude: -46.6995142,
        });

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to a check in', async () => {

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -23.7137429,
            userLongitude: -46.6995142,
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })

    it('should not be able to a check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 3, 20, 8, 0, 0));

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -23.7137429,
            userLongitude: -46.6995142,
        })

        await expect(() =>
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: -23.7137429,
                userLongitude: -46.6995142,
            })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    })

    it('should be able to a check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 3, 20, 8, 0, 0));

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -23.7137429,
            userLongitude: -46.6995142,
        })

        vi.setSystemTime(new Date(2023, 3, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -23.7137429,
            userLongitude: -46.6995142,
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })

    it('should not be able to a check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'javaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-23.6928074),
            longitude: new Decimal(-46.698845),
        });

        await expect(() =>
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-02',
                userLatitude: -23.7137429,
                userLongitude: -46.6995142,
            }),
        ).rejects.toBeInstanceOf(MaxDistanceError);
    })

})

