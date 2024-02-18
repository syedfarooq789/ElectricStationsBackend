import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.provider";
import { CommonModule } from "../common";

@Module({
    imports: [CommonModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
