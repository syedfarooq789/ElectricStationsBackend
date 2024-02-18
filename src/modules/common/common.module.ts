import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { LogInterceptor } from "./flow";
import { LoggerService } from "./provider";
import { ConfigService } from "./config";

@Module({
    imports: [TerminusModule],
    providers: [LoggerService, LogInterceptor, ConfigService],
    exports: [LoggerService, LogInterceptor, ConfigService],
})
export class CommonModule {}
