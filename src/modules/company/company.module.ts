import { Module } from "@nestjs/common";

import { CommonModule } from "../common";
import { CompanyController } from "./controller";
import { CompanyService } from "./service";
import { DatabaseModule } from "../database";
import { companyProvider } from "../company/provider";
import { StationModule } from "../station/station.module";
@Module({
    imports: [CommonModule, DatabaseModule, StationModule],
    providers: [CompanyService, ...companyProvider],
    controllers: [CompanyController],
    exports: [],
})
export class CompanyModule {}
