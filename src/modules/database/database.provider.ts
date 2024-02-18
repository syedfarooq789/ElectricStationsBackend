import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "../common";
import { Station } from "../station/station.entity";
import { Company } from "../company/company.entity";
export const databaseProviders = [
    {
        provide: "SEQUELIZE",
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([Station, Company]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
