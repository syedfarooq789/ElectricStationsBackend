import { CreateStationDto } from "../dto";

export const createStationWithouCompanyId = {
    name: "Station1",
    latitude: 60.1,
    longitude: 50.1,
};

export const createStation: CreateStationDto = {
    stationId: 5001,
    name: "Station1",
    companyId: 5001,
    latitude: 60.1,
    longitude: 50.1,
};

export const updateStationWrongCompanyId = {
    companyId: 10000,
    name: "Station1",
    latitude: 60.1,
    longitude: 50.1,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const updateStation = {
    companyId: 5001,
    name: "Station2",
    latitude: 60.1,
    longitude: 50.1,
    createdAt: new Date(),
    updatedAt: new Date(),
};
