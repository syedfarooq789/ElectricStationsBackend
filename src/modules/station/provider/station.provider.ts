import { Station } from "../station.entity";

export const stationProvider = [
    { provide: "StationRepository", useValue: Station },
];
