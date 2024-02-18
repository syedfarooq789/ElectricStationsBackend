import { Dialect } from "sequelize/types";

export const config = {
    database: {
        dialect: "postgres" as Dialect,
        port: 5432,
        host: process.env.PSQL_HOST || "localhost",
        username: "postgres",
        password: "password",
        define: {
            timestamps: false,
        },
    },
};
