import { Dialect } from "sequelize/types";

export const config = {
    database: {
        dialect: "postgres" as Dialect,
        port: 5432,
        host: "localhost",
        username: "postgres",
        password: "password",
        database: "geoexample",
        define: {
            timestamps: false,
        },
    },
};
