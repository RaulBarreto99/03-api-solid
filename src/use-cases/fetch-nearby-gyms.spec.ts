import { describe, expect, test, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FecthNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FecthNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FecthNearbyGymsUseCase(gymsRepository);

    })

    it('should be able to fetch nearby gyms', async () => {


        await gymsRepository.create({
            title: 'Near Gym',	
            description: null,
            phone: null,
            latitude: -23.7137429,
            longitude: -46.6995142,
        })

        await gymsRepository.create({
            title: 'Far Gym',	
            description: null,
            phone: null,
            latitude: -23.5565882,
            longitude: -46.6383591,
        })


        const { gyms } = await sut.execute({
            userLatitude: -23.7137429,
            userLongitude: -46.6995142,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' }),
        ])
    })

})

