import { ApiProperty } from "@nestjs/swagger";
import { Status } from "../../common";
import { IsOptional } from "class-validator";
import { Company } from "./../company.entity";

export class CompanyDto {
    @ApiProperty({ description: "Company unique ID", example: "1" })
    companyId: number;

    @ApiProperty({ description: "Name of company", example: "Tesla" })
    name: string;

    @IsOptional()
    @ApiProperty({ description: "Status of company" })
    status: Status;

    @IsOptional()
    @ApiProperty({ description: "Company created at" })
    createdAt: Date;

    @IsOptional()
    @ApiProperty({ description: "Company updated at" })
    updatedAt: Date;

    @ApiProperty({ description: "Parent company id" })
    parentCompanyId: number;

    constructor(company: Company) {
        this.companyId = company.companyId;
        this.name = company.name;
        this.status = company.status;
    }
}
