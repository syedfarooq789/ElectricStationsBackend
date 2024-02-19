import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { ApplicationModule } from "../../app.module";
import { INestApplication, ValidationPipe, HttpStatus } from "@nestjs/common";
import {
    createStationWithouCompanyId,
    createStation,
    updateStationWrongCompanyId,
    updateStation,
} from "./test.data";

describe("/", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        }).compile();
        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    describe("POST", () => {
        describe("POST /station", () => {
            it("should return 403 if companyId is null", () => {
                return request(app.getHttpServer())
                    .post("/station")
                    .send(createStationWithouCompanyId)
                    .expect(HttpStatus.FORBIDDEN);
            });

            it("should return 201 if station is created", () => {
                return request(app.getHttpServer())
                    .post("/station")
                    .send(createStation)
                    .expect((res) => {
                        createStation.name = res.body.name;
                        createStation.companyId = res.body.companyId;
                        createStation.latitude = res.body.latitude;
                        createStation.longitude = res.body.longitude;
                        createStation.latitude = res.body.latitude;
                        expect(res.status).toEqual(201);
                    });
            });
        });
        describe("GET", () => {
            describe("GET /station", () => {
                it("it should return station within n km", async () => {
                    return request(app.getHttpServer())
                        .get("/station/60.1/30.1/1")
                        .expect(200);
                });
            });
        });

        describe("PUT", () => {
            describe("PUT /station", () => {
                it("update station data should return 400", () => {
                    return request(app.getHttpServer())
                        .put("/station/5000")
                        .send(updateStationWrongCompanyId)
                        .expect(HttpStatus.BAD_REQUEST);
                });

                it("station data update should return 200", () => {
                    return request(app.getHttpServer())
                        .put("/station/5001")
                        .send(updateStation)
                        .expect((res) => {
                            expect(res.status).toEqual(200);
                        });
                });
            });
        });
    });

    describe("DELETE", () => {
        describe("DELETE /station", () => {
            it("delete station data should return 200", () => {
                return request(app.getHttpServer())
                    .delete("/station/5001")
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
