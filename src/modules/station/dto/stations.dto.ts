import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Station } from "../station.entity";
import { IsOptional } from "class-validator";
export class StationDto {
    @ApiProperty({ description: "Station id" })
    public stationId: number;

    @ApiProperty({ description: "Station name" })
    public name: string;

    @ApiProperty({ description: "Station company id" })
    public companyId: number;

    @IsOptional()
    @ApiProperty({ description: "Station created at" })
    public createdAt: Date;

    @IsOptional()
    @ApiProperty({ description: "Station updated at" })
    public updatedAt: Date;

    @ApiPropertyOptional({ description: "Latitude of station" })
    public latitude: number;

    @ApiPropertyOptional({ description: "Longitude of station" })
    public longitude: number;

    constructor(station: Station) {
        this.companyId = station.companyId;
        this.createdAt = station.createdAt;
        this.updatedAt = station.updatedAt;
        this.name = station.name;
    }
}
