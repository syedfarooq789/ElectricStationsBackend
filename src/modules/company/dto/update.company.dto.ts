import { PickType } from "@nestjs/swagger";
import { CompanyDto } from "./company.dto";

export class UpdateCompanyDto extends PickType(CompanyDto, [
    "name",
    "status",
] as const) {}
