import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientByIdQuery } from '../../queries/get-client-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../infrastructure/persistence/typeorm/entities/client.typeorm';

@QueryHandler(GetClientByIdQuery)
export class GetClientByIdHandler
  implements IQueryHandler<GetClientByIdQuery>
{
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  async execute(query: GetClientByIdQuery) {
    const id = query.id;

    const client: ClientTypeORM = await this.clientRepository.findOne(
      id,
    );

    return client;
  }
}
