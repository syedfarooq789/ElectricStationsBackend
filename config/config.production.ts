import { Dialect } from "sequelize/types";

export const config = {
    database: {
        dialect: "postgres" as Dialect,
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "geoexample",
        logging: false,
    },
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};
