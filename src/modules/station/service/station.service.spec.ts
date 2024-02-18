import { Test, TestingModule } from "@nestjs/testing";
import { StationService } from "..";
import { getModelToken } from "@nestjs/sequelize";
import { Station } from "../station.entity";
import { Status } from "../../common";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "../../common/config";
import { ApiResult } from "../../common";
import { CreateStationDto, GetStationsReqDto, UpdateStationDto } from "../dto";
import { Company } from "../../company/company.entity";

describe("StationService", () => {
    let stationService: StationService;
    let sequelize: Sequelize;
    let configService: ConfigService;
    const mockStationRepository = {
        findAll: jest.fn(),
        findByPk: jest.fn(),
    };

    const station = {
        stationId: 5000,
        companyId: 3000,
        name: "Tesla",
        status: Status.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        longitude: "60.4",
        latitude: "50.3",
    };

    const configRepository = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: "SEQUELIZE",
                    useFactory: (configService: ConfigService) => {
                        sequelize = new Sequelize(
                            configService.sequelizeOrmConfig
                        );

                        sequelize.addModels([Company, Station]);
                        return sequelize;
                    },
                    inject: [ConfigService],
                },
                StationService,
                {
                    provide: getModelToken(Station),
                    useValue: mockStationRepository,
                },
                ConfigService,
                {
                    provide: getModelToken(ConfigService),
                    useValue: configRepository,
                },
            ],
        }).compile();

        stationService = module.get<StationService>(StationService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it("should be defined", () => {
        expect(stationService).toBeDefined();
        expect(configService).toBeDefined();
    });
    it("create station", async () => {
        const createStationDto = {
            stationId: 0,
            companyId: 1,
            name: "Tesla",
            longitude: 60.4,
            latitude: 50.3,
        } as CreateStationDto;
        const result = await stationService.create(createStationDto);
        if (result instanceof ApiResult) {
            expect(result.data).toEqual(station.companyId);
        }
    });

    it("getStationsWithinRange", async () => {
        const createStationDto = {
            long: 60.4,
            lat: 50.3,
            dist: 10,
        } as GetStationsReqDto;

        jest.spyOn(mockStationRepository, "findAll").mockReturnValue(station);
        await stationService.getStationsWithinRange(createStationDto);
        expect(mockStationRepository.findAll).toHaveBeenCalled();
    });
    it("update", async () => {
        const updateStationDto = {
            longitude: 60.4,
            latitude: 50.3,
            name: "Tesla",
            companyId: 1,
        } as UpdateStationDto;
        jest.spyOn(mockStationRepository, "findByPk").mockReturnValue(station);
        const result = await stationService.update(
            station.stationId,
            updateStationDto
        );
        if (result instanceof ApiResult) {
            expect(result.data).toEqual(station);
        }
        expect(mockStationRepository.findByPk).toHaveBeenCalled();
    });
    it("delete", async () => {
        jest.spyOn(mockStationRepository, "findByPk").mockReturnValue(station);
        const result = await stationService.delete(station.companyId);
        if (result instanceof ApiResult) {
            expect(result.data).toEqual(station.companyId);
        }
        expect(mockStationRepository.findByPk).toHaveBeenCalled();
    });
});
