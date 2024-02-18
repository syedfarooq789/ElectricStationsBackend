import { Injectable, Inject } from "@nestjs/common";
import { Station } from "../station.entity";
import {
    CreateStationDto,
    GetStationsReqDto,
    StationDto,
    UpdateStationDto,
} from "../dto";
import { fn, where, and, col, literal } from "sequelize";
import {
    Point,
    Error,
    ErrorCodes,
    ApiResult,
    SequelizeErrorHandler,
} from "../../common";

@Injectable()
export class StationService {
    DISTANCE_IN_KMS: number = 1000;
    public constructor(
        @Inject("StationRepository")
        private readonly stationRepository: typeof Station
    ) {}

    /**
     * Create a new station record
     *
     * @param data Station details
     * @returns A station created in the database
     */
    async create(createStationDto: CreateStationDto) {
        try {
            const station = new Station();
            if (createStationDto.longitude && createStationDto.latitude) {
                const point: Point = {
                    type: "Point",
                    coordinates: [
                        createStationDto.longitude,
                        createStationDto.latitude,
                    ],
                };
                station.stationId = createStationDto.stationId;
                station.companyId = createStationDto.companyId;
                station.name = createStationDto.name;
                station.point = point;
                station.createdAt = new Date();
            } else {
                return new Error(
                    ErrorCodes.BAD_REQUEST_EXCEPTION,
                    "Latitude longitude should have a value"
                );
            }
            return new ApiResult((await station.save()).dataValues.stationId);
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }

    /**
     * Get stations within given range
     *
     * @param getStationsWithinRangeDto Station details
     * @returns Array of stations
     */
    async getStationsWithinRange(getStationsWithinRangeDto: GetStationsReqDto) {
        try {
            const stations = await this.stationRepository.findAll({
                attributes: {
                    include: [
                        [fn("ST_X", col("point")), "longitude"],
                        [fn("ST_Y", col("point")), "latitude"],
                        [
                            fn(
                                "ST_DistanceSphere",
                                fn(
                                    "ST_Point",
                                    fn("ST_X", fn("ST_Centroid", col("point"))),
                                    fn("ST_Y", fn("ST_Centroid", col("point")))
                                ),
                                fn(
                                    "ST_MakePoint",
                                    getStationsWithinRangeDto.long,
                                    getStationsWithinRangeDto.lat
                                )
                            ),
                            "distance",
                        ],
                    ],
                },
                where: and(
                    where(
                        fn("GeometryType", fn("ST_Centroid", col("point"))),
                        "=",
                        "POINT"
                    ),
                    where(
                        fn(
                            "ST_DistanceSphere",
                            fn(
                                "ST_Point",
                                fn("ST_X", fn("ST_Centroid", col("point"))),
                                fn("ST_Y", fn("ST_Centroid", col("point")))
                            ),
                            fn(
                                "ST_MakePoint",
                                getStationsWithinRangeDto.long,
                                getStationsWithinRangeDto.lat
                            )
                        ),
                        "<=",
                        getStationsWithinRangeDto.dist * this.DISTANCE_IN_KMS
                    )
                ),
                order: literal("distance ASC"),
            });
            return new ApiResult(stations);
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }

    /**
     * Update the station with given id
     *
     * @param stationId Station id
     * @param updateStationDto Station to be updated
     * @returns station
     */
    async update(stationId: number, updateStationDto: UpdateStationDto) {
        try {
            const station = await this.stationRepository.findByPk<Station>(
                stationId
            );
            if (!station) {
                throw new Error(
                    ErrorCodes.NOT_FOUND_EXCEPTION,
                    "Station not found"
                );
            }
            station.name = updateStationDto.name || station.name;
            station.companyId = updateStationDto.companyId || station.companyId;
            station.updatedAt = new Date();
            if (updateStationDto.longitude && updateStationDto.latitude) {
                var point: Point = {
                    type: "Point",
                    coordinates: [
                        updateStationDto.longitude,
                        updateStationDto.latitude,
                    ],
                };
                station.point = point;
            }
            return new ApiResult(
                new StationDto((await station.save()).dataValues)
            );
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }

    /**
     * Get station count
     *
     * @param companies unique parent and child companies
     * @returns station count
     */
    async getStationCountChildCompanies(companies: Array<number>) {
        const stations = await this.stationRepository.findAndCountAll({
            where: {
                companyId: companies,
            },
        });
        return stations.count;
    }

    /**
     * Deletes the station with given id
     *
     * @param stationId Station id
     * @returns station
     */
    async delete(stationId: number) {
        try {
            const station = await this.stationRepository.findByPk<Station>(
                stationId
            );
            if (!station) {
                throw new Error(
                    ErrorCodes.NOT_FOUND_EXCEPTION,
                    "Station not found"
                );
            }
            await station.destroy();
            return new ApiResult(station.dataValues.stationId);
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }
}
