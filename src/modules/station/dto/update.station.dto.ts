import { PickType } from "@nestjs/swagger";
import { StationDto } from "./stations.dto";

export class UpdateStationDto extends PickType(StationDto, [
    "name",
    "companyId",
    "latitude",
    "longitude",
] as const) {}
