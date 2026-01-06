import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FecthNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new FecthNearbyGymsUseCase(gymsRepository);

    return useCase
}