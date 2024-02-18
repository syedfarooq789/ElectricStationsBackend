"use strict";
const sql = `
create table "station" (
    "stationId" int PRIMARY KEY, 
    "companyId" integer NOT NULL, 
    "name" varchar(255), 
    "point" geometry(Point, 4326) NOT NULL, 
    "createdAt" timestamp with time zone, 
    "updatedAt" timestamp with time zone, 
    FOREIGN KEY ("companyId") REFERENCES company("companyId") ON DELETE CASCADE
)
`;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface) => queryInterface.sequelize.query(sql),
    down: () => {},
};
