import { Test, TestingModule } from "@nestjs/testing";
import { CompanyService } from "./company.service";
import { StationService } from "../../station";
import { getModelToken } from "@nestjs/sequelize";
import { Company } from "../company.entity";
import { Station } from "../../station/station.entity";
import { CreateCompanyDto } from "../dto";
import { Status } from "../../common";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "../../common/config";
import { ApiResult } from "../../common";

describe("CompanyService", () => {
    let companyService: CompanyService;
    let stationService: StationService;
    let sequelize: Sequelize;
    let configService: ConfigService;
    const mockCompanyRepository = {
        findByPk: jest.fn(),
        findAll: jest.fn(),
    };
    const mockStationRepository = {
        getStationCountChildCompanies: jest.fn(),
        stationRepository: jest.fn(),
        findAndCountAll: jest.fn(),
    };

    const company = {
        id: 3000,
        companyId: 3000,
        name: "Tesla",
        status: Status.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        path: "1",
    } as Company;

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
                CompanyService,
                {
                    provide: getModelToken(Company),
                    useValue: mockCompanyRepository,
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

        companyService = module.get<CompanyService>(CompanyService);
        stationService = module.get<StationService>(StationService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it("should be defined", () => {
        expect(companyService).toBeDefined();
        expect(stationService).toBeDefined();
        expect(configService).toBeDefined();
    });
    it("create company", async () => {
        const createCompanyDto = {
            companyId: 3000,
            name: "Tesla",
            status: Status.ACTIVE,
            parentCompanyId: 0,
        } as CreateCompanyDto;

        jest.spyOn(mockCompanyRepository, "findByPk").mockReturnValue(company);
        const result = await companyService.create(createCompanyDto);
        if (result instanceof ApiResult) {
            expect(result.data).toEqual(company.companyId);
        }
        expect(mockCompanyRepository.findByPk).toHaveBeenCalled();
    });

    it("getCompany", async () => {
        jest.spyOn(mockCompanyRepository, "findByPk").mockReturnValue(company);
        await companyService.getCompany(company.companyId);
        expect(mockCompanyRepository.findByPk).toHaveBeenCalled();
    });
    it("update", async () => {
        jest.spyOn(mockCompanyRepository, "findByPk").mockReturnValue(company);
        const result = await companyService.update(company.companyId, company);
        if (result instanceof ApiResult) {
            expect(result.data).toEqual(company);
        }
        expect(mockCompanyRepository.findByPk).toHaveBeenCalled();
    });
    it("delete", async () => {
        jest.spyOn(mockCompanyRepository, "findByPk").mockReturnValue(company);
        const result = await companyService.delete(company.companyId);
        if (result instanceof ApiResult) {
            expect(result.data).toEqual(company.companyId);
        }
        expect(mockCompanyRepository.findByPk).toHaveBeenCalled();
    });
    it("getCompanyStationsById", async () => {
        jest.spyOn(mockCompanyRepository, "findAll").mockReturnValue([company]);
        jest.spyOn(
            mockStationRepository,
            "getStationCountChildCompanies"
        ).mockReturnValue(() => 3);
        jest.spyOn(mockStationRepository, "findAndCountAll").mockReturnValue(
            () => 3
        );
        await companyService.getCompanyStationsById(company.companyId);
        expect(mockCompanyRepository.findAll).toHaveBeenCalled();
    });
});
