import { Test, TestingModule } from "@nestjs/testing";
import { CompanyController } from "./company.controller";
import { CompanyService } from "../service/company.service";
import { ApiResult, Status } from "../../common";
import { CreateCompanyDto } from "../dto";
import { Company } from "../company.entity";
import { ConfigService } from "../../common/config";
import { Sequelize } from "sequelize-typescript";
import { Station } from "../../station/station.entity";
import { getModelToken } from "@nestjs/sequelize";

describe("UsersController", () => {
    let companyController: CompanyController;
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
            controllers: [CompanyController],
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
                CompanyService,
                {
                    provide: CompanyService,
                    useValue: mockCompanyService,
                },
                ConfigService,
                {
                    provide: getModelToken(ConfigService),
                    useValue: configRepository,
                },
            ],
        }).compile();

        companyController = module.get<CompanyController>(CompanyController);
    });

    it("should be defined", () => {
        expect(companyController).toBeDefined();
    });

    it("create", async () => {
        const createCompanyDto = {
            companyId: 8000,
            name: "Tesla",
            status: Status.ACTIVE,
            parentCompanyId: 1,
        } as CreateCompanyDto;

        jest.spyOn(mockCompanyService, "create").mockReturnValue(
            new ApiResult(createCompanyDto.companyId)
        );
        await expect(
            companyController.create(createCompanyDto)
        ).resolves.toEqual(createCompanyDto.companyId);
        expect(mockCompanyService.create).toHaveBeenCalled();
    });
    it("update", async () => {
        const updateCompanyDto = {
            name: "Tesla",
            status: Status.ACTIVE,
        };

        jest.spyOn(mockCompanyService, "update").mockReturnValue(
            new ApiResult(updateCompanyDto)
        );
        await expect(
            companyController.update(updateCompanyDto, 3000)
        ).resolves.toEqual(updateCompanyDto);
        expect(mockCompanyService.update).toHaveBeenCalled();
    });

    it("getStationsForAllCompanies", async () => {
        jest.spyOn(
            mockCompanyService,
            "getCompanyStationsById"
        ).mockReturnValue(3);
        await expect(
            companyController.getCompanyStationsById(1)
        ).resolves.toEqual(3);
        expect(mockCompanyService.getCompanyStationsById).toHaveBeenCalled();
    });
    it("delete", async () => {
        jest.spyOn(mockCompanyService, "delete").mockReturnValue(
            new ApiResult(3)
        );
        await expect(companyController.delete(1)).resolves.toEqual(3);
        expect(mockCompanyService.delete).toHaveBeenCalled();
    });
});
