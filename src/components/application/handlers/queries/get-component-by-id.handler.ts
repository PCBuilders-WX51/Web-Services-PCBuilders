import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetComponentByIdQuery } from '../../queries/get-component-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentsTypeOrm } from '../../../infrastructure/persistence/typeorm/entities/components.type.orm';

@QueryHandler(GetComponentByIdQuery)
export class GetComponentByIdHandler implements  IQueryHandler<GetComponentByIdQuery> {
  constructor(@InjectRepository(ComponentsTypeOrm) private componentRepository: Repository<ComponentsTypeOrm>) {}

  async execute(query: GetComponentByIdQuery): Promise<object> {
    const componentId = query.id;
    const componentTypeOrm: ComponentsTypeOrm = await this.componentRepository.findOne(componentId);
    return componentTypeOrm;
  }
}
