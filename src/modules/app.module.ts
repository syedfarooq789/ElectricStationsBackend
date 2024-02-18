import { Module } from "@nestjs/common";

import { CommonModule } from "./common";
import { CompanyModule } from "./company";
import { StationModule } from "./station";

@Module({
    imports: [CommonModule, CompanyModule, StationModule],
})
export class ApplicationModule {}
