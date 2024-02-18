import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class GetStationsReqDto {
    @ApiProperty({ description: "Latitude of station" })
    @IsNumber()
    @Type(() => Number)
    public lat: number;

    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ description: "Longitude of station" })
    public long: number;

    @Type(() => Number)
    @IsInt()
    @ApiProperty({ description: "Distance within data is fetched" })
    public dist: number;
}
