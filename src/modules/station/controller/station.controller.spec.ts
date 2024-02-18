import { Test, TestingModule } from "@nestjs/testing";
import { StationController } from "./station.controller";
import { StationService } from "../service/station.service";
import { ApiResult } from "../../common";
import { ConfigService } from "../../common/config";
import { Sequelize } from "sequelize-typescript";
import { Station } from "../../station/station.entity";
import { getModelToken } from "@nestjs/sequelize";
import { Company } from "../../company/company.entity";
import { CreateStationDto } from "../dto";

describe("UsersController", () => {
    let stationController: StationController;
    let sequelize: Sequelize;
    const mockCompanyService = {
        create: jest.fn(),
        update: jest.fn(),
        getCompanyStationsById: jest.fn(),
        delete: jest.fn(),
    };

    const configRepository = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StationController],
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
                    provide: StationService,
                    useValue: mockCompanyService,
                },
                ConfigService,
                {
                    provide: getModelToken(ConfigService),
                    useValue: configRepository,
                },
            ],
        }).compile();

        stationController = module.get<StationController>(StationController);
    });

    it("should be defined", () => {
        expect(stationController).toBeDefined();
    });

    it("create", async () => {
        const createStationDto = {
            stationId: 0,
            companyId: 1,
            name: "Tesla",
            longitude: 60.4,
            latitude: 50.3,
        } as CreateStationDto;

        jest.spyOn(mockCompanyService, "create").mockReturnValue(
            new ApiResult(createStationDto.companyId)
        );
        await expect(
            stationController.create(createStationDto)
        ).resolves.toEqual(createStationDto.companyId);
        expect(mockCompanyService.create).toHaveBeenCalled();
    });
    it("update", async () => {
        const updateStationDto = {
            companyId: 1,
            name: "Tesla",
            longitude: 60.4,
            latitude: 50.3,
        };
        jest.spyOn(mockCompanyService, "update").mockReturnValue(
            new ApiResult(updateStationDto)
        );
        await expect(
            stationController.update(updateStationDto, 0)
        ).resolves.toEqual(updateStationDto);
        expect(mockCompanyService.update).toHaveBeenCalled();
    });

    it("delete", async () => {
        jest.spyOn(mockCompanyService, "delete").mockReturnValue(
            new ApiResult(3)
        );
        await expect(stationController.delete(1)).resolves.toEqual(3);
        expect(mockCompanyService.delete).toHaveBeenCalled();
    });
});
