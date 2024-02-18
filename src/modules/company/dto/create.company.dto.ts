import { PickType } from "@nestjs/swagger";
import { CompanyDto } from "./company.dto";

export class CreateCompanyDto extends PickType(CompanyDto, [
    "companyId",
    "name",
    "status",
    "parentCompanyId",
] as const) {}
