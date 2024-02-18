import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    ParseIntPipe,
    Put,
    HttpException,
} from "@nestjs/common";
import {
    ApiOperation,
    ApiTags,
    ApiParam,
    ApiOkResponse,
} from "@nestjs/swagger";
import {
    CreateStationDto,
    GetStationsReqDto,
    StationDto,
    UpdateStationDto,
} from "../dto";
import { Station } from "../station.entity";
import { StationService } from "../service";
import { GetStationsPipe } from "../flow";
import { ApiResult } from "../../common";

@Controller("station")
@ApiTags("station")
export class StationController {
    public constructor(private readonly stationService: StationService) {}
    @Post()
    @ApiOperation({ summary: "Create station" })
    @ApiOkResponse({ type: CreateStationDto })
    async create(@Body() createStation: CreateStationDto): Promise<number> {
        const result = await this.stationService.create(createStation);
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }

    @Put("/:stationId")
    @ApiOperation({ summary: "Update station" })
    @ApiOkResponse({ type: UpdateStationDto })
    async update(
        @Body() updateStation: UpdateStationDto,
        @Param("stationId", ParseIntPipe) stationId: number
    ): Promise<UpdateStationDto> {
        const result = await this.stationService.update(
            stationId,
            updateStation
        );
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }

    @Get("/:lat/:long/:dist")
    @ApiOperation({ summary: "Get station with n km range" })
    @ApiParam({
        name: "lat",
        required: true,
        description: "latitude",
    })
    @ApiParam({
        name: "long",
        required: true,
        description: "longitude",
    })
    @ApiParam({
        name: "dist",
        required: true,
        description: "distance in kms",
    })
    @ApiOkResponse({ type: GetStationsReqDto })
    async getStationsWithinRange(
        @Param(GetStationsPipe) getStationsReqDto: GetStationsReqDto
    ): Promise<Station[]> {
        const result = await this.stationService.getStationsWithinRange(
            getStationsReqDto
        );
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }

    @Delete("/:stationId")
    @ApiOperation({ summary: "Delete station" })
    @ApiOkResponse({ type: StationDto })
    async delete(
        @Param("stationId", ParseIntPipe) stationId: number
    ): Promise<number> {
        const result = await this.stationService.delete(stationId);
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }
}
