import { Company } from "../company.entity";

export const companyProvider = [
    { provide: "CompanyRepository", useValue: Company },
];
