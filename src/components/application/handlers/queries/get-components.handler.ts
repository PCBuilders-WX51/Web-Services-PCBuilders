import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetCompaniesQuery } from '../../../../companies/application/queries/get-companies.query';
import { GetComponentDto } from '../../dto/queries/get-component.dto';
import { GetComponentsQuery } from '../../queries/get-components.query';
import { StateTypeMapper } from "../../mapper/state-type.mapper";

@QueryHandler(GetComponentsQuery)
export class GetComponentsHandler implements IQueryHandler<GetComponentsQuery> {
  constructor() {}

  async execute(query: GetCompaniesQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.companyId,
      a.piece,
      a.description,
      a.announcementId,
      a.state,
      date_format(a.date, '%Y-%m-%d') AS date
    FROM 
      components a
    ORDER BY
      a.date DESC;`;
    const ormComponent = await manager.query(sql);
    if (ormComponent.length <= 0) {
      return [];
    }
    const components: GetComponentDto[] = ormComponent.map(function (ormComponent) {
      let componentDto = new GetComponentDto();
      let stateString = StateTypeMapper.toTypeString(ormComponent.state);

      componentDto.id = Number(ormComponent.id);
      componentDto.companyId = Number(ormComponent.companyId);
      componentDto.announcementId = Number(ormComponent.announcementId);
      componentDto.state = stateString;
      componentDto.date = ormComponent.date;
      return componentDto;
    });
    return components;
  }
}
