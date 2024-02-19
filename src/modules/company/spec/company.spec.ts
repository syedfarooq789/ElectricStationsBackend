import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { ApplicationModule } from "../../app.module";
import { INestApplication, ValidationPipe, HttpStatus } from "@nestjs/common";
import {
    createCompanyIDAlreadyExists,
    createCompanyWithouCompanyId,
    createCompanyWithoutStatus,
    updateCompanyWrongStatus,
    updateCompany,
    createCompany,
} from "./test.data";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "../../common/config";
import { Company } from "../company.entity";
import { Station } from "../../station/station.entity";
import { getModelToken } from "@nestjs/sequelize";
describe("/", () => {
    let app: INestApplication;
    let sequelize: Sequelize;
    const configRepository = {};
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
            providers: [
                {
                    provide: "SEQUELIZE",
                    useFactory: (configService: ConfigService) => {
                        sequelize = new Sequelize(
                            configService.sequelizeOrmConfig,
                        );

                        sequelize.addModels([Company, Station]);
                        return sequelize;
                    },
                    inject: [ConfigService],
                },
                ConfigService,
                {
                    provide: getModelToken(ConfigService),
                    useValue: configRepository,
                },
            ],
        }).compile();
        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    describe("POST", () => {
        describe("POST /company", () => {
            it("should return 403 if companyId is null", () => {
                return request(app.getHttpServer())
                    .post("/company")
                    .send(createCompanyWithouCompanyId)
                    .expect(HttpStatus.FORBIDDEN);
            });

            it("should return 200 if company is created", () => {
                return request(app.getHttpServer())
                    .post("/company")
                    .send(createCompany)
                    .expect((res) => {
                        createCompany.companyId = res.body.companyId;
                        createCompany.parentCompanyId =
                            res.body.parentCompanyId;
                        createCompany.name = createCompany.name;
                        createCompany.status = createCompany.status;
                        expect(res.status).toEqual(201);
                    });
            });

            it("should return 409 if company id already exists", () => {
                return request(app.getHttpServer())
                    .post("/company")
                    .send(createCompanyIDAlreadyExists)
                    .expect(HttpStatus.BAD_REQUEST);
            });

            it("should return 400 if status is not a valid enum value", () => {
                return request(app.getHttpServer())
                    .post("/company")
                    .send(createCompanyWithoutStatus)
                    .expect(HttpStatus.BAD_REQUEST);
            });
        });
    });

    describe("GET", () => {
        describe("GET /company", () => {
            it("it should return company id", async () => {
                return request(app.getHttpServer())
                    .get("/company/5000")
                    .expect(200)
                    .expect(({ body }) => {
                        expect(body.companyId).toEqual(5000);
                    });
            });

            it("it should return 403", () => {
                return request(app.getHttpServer())
                    .get("/company/300")
                    .expect(HttpStatus.NOT_FOUND);
            });
        });
    });

    describe("PUT", () => {
        describe("PUT /company", () => {
            it("update company data should return 400", () => {
                return request(app.getHttpServer())
                    .put("/company/5000")
                    .send(updateCompanyWrongStatus)
                    .expect(HttpStatus.BAD_REQUEST);
            });

            it("company data update should return 200", () => {
                return request(app.getHttpServer())
                    .put("/company/5000")
                    .send(updateCompany)
                    .expect((res) => {
                        expect(res.status).toEqual(200);
                    });
            });
        });
    });

    describe("DELETE", () => {
        describe("DELETE /company", () => {
            it("delete company data should return 200", () => {
                return request(app.getHttpServer())
                    .delete("/company/5000")
                    .expect((res) => {
                        expect(res.status).toEqual(200);
                    });
            });
        });

        describe("DELETE", () => {
            it("delete company data should return 404", () => {
                return request(app.getHttpServer())
                    .delete("/company/1150")
                    .expect((res) => {
                        expect(res.status).toEqual(404);
                    });
            });
        });
    });

    describe("/stations/:companyId", () => {
        describe("Get /stations/:companyId", () => {
            it("it should get stations with 200", () => {
                return request(app.getHttpServer())
                    .get("/company/stations/5000")
                    .expect((res) => {
                        expect(res.status).toEqual(200);
                    });
            });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
