"use strict";
const sql = `
    insert INTO "company" ("companyId","name","status","createdAt","updatedAt") VALUES (5001,'TestingCompany','ACTIVE',TO_DATE('17/12/2015', 'DD/MM/YYYY'),TO_DATE('17/12/2015', 'DD/MM/YYYY'))
`;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface) => queryInterface.sequelize.query(sql),
    down: () => {},
};
