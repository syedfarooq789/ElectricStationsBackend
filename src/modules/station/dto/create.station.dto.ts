import { PickType } from "@nestjs/swagger";
import { StationDto } from "./stations.dto";

export class CreateStationDto extends PickType(StationDto, [
    "stationId",
    "name",
    "companyId",
    "latitude",
    "longitude",
] as const) {}
