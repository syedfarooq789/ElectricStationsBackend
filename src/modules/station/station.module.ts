import { Module } from "@nestjs/common";

import { CommonModule } from "../common";
import { StationController } from "./controller";
import { StationService } from "./service";
import { DatabaseModule } from "../database";
import { stationProvider } from "./provider";
@Module({
    imports: [CommonModule, DatabaseModule],
    providers: [StationService, ...stationProvider],
    controllers: [StationController],
    exports: [StationService],
})
export class StationModule {}
