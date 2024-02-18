import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Delete,
    HttpException,
} from "@nestjs/common";
import {
    ApiOperation,
    ApiOkResponse,
    ApiTags,
    ApiParam,
} from "@nestjs/swagger";
import { CompanyService } from "../service";
import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from "../dto";
import { ApiResult } from "../../common";

@Controller("company")
@ApiTags("company")
export class CompanyController {
    public constructor(private readonly companyService: CompanyService) {}

    @Post()
    @ApiOperation({ summary: "Create company" })
    @ApiOkResponse({ type: CreateCompanyDto })
    public async create(
        @Body() createCompanyDto: CreateCompanyDto
    ): Promise<number> {
        const result = await this.companyService.create(createCompanyDto);
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }

    @Get("/:companyId")
    @ApiOperation({ summary: "Get company" })
    @ApiOkResponse({ type: CompanyDto })
    @ApiParam({
        name: "companyId",
        required: true,
        description: "Get company by id",
    })
    public async getCompany(
        @Param("companyId", ParseIntPipe) companyId: number
    ): Promise<CompanyDto> {
        const result = await this.companyService.getCompany(companyId);
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }

    @Put("/:companyId")
    @ApiOperation({ summary: "Update company" })
    @ApiOkResponse({ type: UpdateCompanyDto })
    public async update(
        @Body() updateCompanyDto: UpdateCompanyDto,
        @Param("companyId", ParseIntPipe) companyId: number
    ): Promise<UpdateCompanyDto> {
        const result = await this.companyService.update(
            companyId,
            updateCompanyDto
        );
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }

    @Get("/stations/:companyId")
    @ApiOperation({ summary: "Get companies child stations" })
    @ApiParam({
        name: "companyId",
        required: true,
        description: "company id",
    })
    @ApiOkResponse({ type: CompanyDto })
    public async getCompanyStationsById(
        @Param("companyId", ParseIntPipe) companyId: number
    ): Promise<number> {
        return this.companyService.getCompanyStationsById(companyId);
    }

    @Delete("/:companyId")
    @ApiOperation({ summary: "Delete company" })
    @ApiOkResponse({ type: CompanyDto })
    public async delete(
        @Param("companyId", ParseIntPipe) companyId: number
    ): Promise<number> {
        const result = await this.companyService.delete(companyId);
        if (result instanceof ApiResult) {
            return result.data;
        }
        throw new HttpException(result.message, result.code);
    }
}
