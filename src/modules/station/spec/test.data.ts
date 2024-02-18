import { StationDto } from "../dto";
export const createStationWithouCompanyId = {
    name: "Station1",
    latitude: 60.1,
    longitude: 50.1,
};

export const createStation: StationDto = {
    stationId: 5000,
    companyId: 1,
    name: "Station1",
    latitude: 60.1,
    longitude: 50.1,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const updateStationWrongCompanyId = {
    companyId: 5000,
    name: "Station1",
    latitude: 60.1,
    longitude: 50.1,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const updateStation = {
    companyId: 1,
    name: "Station2",
    latitude: 60.1,
    longitude: 50.1,
    createdAt: new Date(),
    updatedAt: new Date(),
};
