import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCompaniesQuery } from '../../queries/get-companies.query';
import { getManager } from 'typeorm';
import { GetCompaniesDto } from '../../dtos/queries/get-companies.dto';
import { GetClientsDto } from '../../../../clients/application/dtos/queries/get-client.dto';

@QueryHandler(GetCompaniesQuery)
export class GetCompaniesHandler implements IQueryHandler<GetCompaniesQuery> {
  constructor() {}

  async execute(query: GetCompaniesQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        name_company as nameCompany,
        description_company as descriptionCompany,
        email,
        password
    FROM
        companies
    ORDER BY
        name_company;  
    `;

    const ormCompanies = await manager.query(sql);

    if (ormCompanies.length <= 0) {
      return [];
    }

    const companies: GetCompaniesDto[] = ormCompanies.map(function (
      ormCompany,
    ) {
      const companyDto = new GetCompaniesDto();
      companyDto.id = Number(ormCompany.id);
      companyDto.nameCompany = ormCompany.nameCompany;
      companyDto.email = ormCompany.email;
      companyDto.password = ormCompany.password;
      companyDto.descriptionCompany = ormCompany.descriptionCompany;
      return companyDto;
    });

    return companies;
  }
}
