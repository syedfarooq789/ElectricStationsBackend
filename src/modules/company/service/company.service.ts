import { Injectable, Inject } from "@nestjs/common";
import { Company } from "../company.entity";
import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from "../dto";
import {
    Error,
    ErrorCodes,
    ApiResult,
    SequelizeErrorHandler,
} from "../../common";
import { Op } from "sequelize";
import { StationService } from "../../station";

@Injectable()
export class CompanyService {
    public constructor(
        @Inject("CompanyRepository")
        private readonly companyRepository: typeof Company,
        private stationService: StationService
    ) {}

    /**
     * Create a new company record
     *
     * @param createCompanyDto Company to be created
     * @returns company
     */
    async create(createCompanyDto: CreateCompanyDto) {
        const company = new Company();
        try {
            company.companyId = createCompanyDto.companyId;
            company.status = createCompanyDto.status;
            company.name = createCompanyDto.name;
            company.createdAt = new Date();
            const parentData = await this.companyRepository.findByPk<Company>(
                createCompanyDto.parentCompanyId
            );
            const savedCompany = await company.save();
            company.path = parentData
                ? parentData.path.toString() +
                  "." +
                  savedCompany.companyId.toString()
                : savedCompany.companyId.toString();
            await company.save();

            return new ApiResult(savedCompany.companyId);
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }

    /**
     * Get company by id
     *
     * @param data Company id
     * @returns company
     */
    async getCompany(id: number) {
        try {
            const company = await this.companyRepository.findByPk<Company>(id);
            if (!company) {
                return new Error(
                    ErrorCodes.NOT_FOUND_EXCEPTION,
                    "Company not found"
                );
            }
            return new ApiResult(new CompanyDto(company));
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }

    /**
     * Update the company with given id
     *
     * @param companyId Company id
     *  @param companyDto Company object to update
     * @returns company
     */
    async update(companyId: number, updateCompanyDto: UpdateCompanyDto) {
        try {
            const company = await this.companyRepository.findByPk<Company>(
                companyId
            );
            if (!company) {
                return new Error(
                    ErrorCodes.NOT_FOUND_EXCEPTION,
                    "Company not found"
                );
            }
            company.name = updateCompanyDto.name || company.name;
            company.updatedAt = new Date();
            company.status = updateCompanyDto.status || company.status;
            const savedCompanyData = await company.save();
            return new ApiResult(
                new UpdateCompanyDto(savedCompanyData.dataValues)
            );
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }

    /**
     * Deletes the company with given id
     *
     * @param companyId Station id
     * @returns company
     */
    async delete(companyId: number) {
        try {
            const companies: Array<number> = [];

            const company = await this.companyRepository.findByPk<Company>(
                companyId
            );
            if (!company) {
                return new Error(
                    ErrorCodes.NOT_FOUND_EXCEPTION,
                    "Company not found"
                );
            }

            // delete company and also its children.
            const subCompanies = await this.companyRepository.findAll({
                where: {
                    path: {
                        [Op.regexp]: "*" + "." + companyId.toString() + ".*",
                    },
                },
            });
            subCompanies.map((companyRelation: Company) => {
                companies.push(companyRelation.companyId);
            });
            await this.companyRepository.destroy({
                where: {
                    companyId: companies,
                },
            });

            // delete cascade will delete all entries from other tables
            return new ApiResult(companyId);
        } catch (e) {
            return SequelizeErrorHandler(e);
        }
    }

    /**
     * Get companies stations
     *
     * @param companyId Station id
     * @returns company child stations
     */
    async getCompanyStationsById(companyId: number) {
        const companies: Array<number> = [];
        const subCompanies = await this.companyRepository.findAll({
            where: {
                path: {
                    [Op.regexp]: "*" + "." + companyId.toString() + ".*",
                },
            },
        });
        subCompanies.map((companyRelation: Company) => {
            companies.push(companyRelation.companyId);
        });
        const stationsCount =
            await this.stationService.getStationCountChildCompanies(companies);
        return stationsCount;
    }
}
