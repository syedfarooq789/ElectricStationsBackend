import { Status } from "../../common/enum";
import { CreateCompanyDto } from "../dto";
export const createCompanyWithouCompanyId = {
    name: "TeslaStation",
    status: Status.ACTIVE,
    parentCompanyId: 0,
};

export const createCompany: CreateCompanyDto = {
    companyId: 5000,
    name: "macb",
    status: Status.ACTIVE,
    parentCompanyId: 0,
};

export const createCompanyWithoutStatus = {
    companyId: 5000,
    name: "TeslaStation",
    status: "string",
    parentCompanyId: 0,
};

export const createCompanyIDAlreadyExists = {
    companyId: 5000,
    name: "TeslaStation",
    status: "string",
    parentCompanyId: 0,
};

export const createCompanyTest = {
    companyId: 5001,
    name: "TestingCompany",
    status: "ACTIVE",
    parentCompanyId: 0,
};

export const updateCompanyWrongStatus = {
    name: "TeslaStation",
    status: "string",
};

export const updateCompany = {
    name: "TeslaStation",
    status: "ACTIVE",
};
