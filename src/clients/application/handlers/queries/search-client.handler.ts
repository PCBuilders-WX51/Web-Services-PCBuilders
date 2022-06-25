import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchClientQuery } from '../../queries/search-client.query';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { SearchClientDto } from '../../dtos/queries/search-client.dto';

@QueryHandler(SearchClientQuery)
export class SearchClientHandler
  implements IQueryHandler<SearchClientQuery>
{
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  async execute(query: SearchClientQuery) {
    const keyword = query.keyword;

    const ormClients = await this.clientRepository
      .createQueryBuilder('client')
      .where('client.first_name like :first_name', {
        first_name: `%${keyword}%`,
      })
      .orWhere('client.last_name like :last_name', {
        last_name: `%${keyword}%`,
      })
      .orWhere('client.my_liking like :my_liking', {
        my_liking: `%${keyword}%`,
      })
      .getMany();

    if (ormClients.length <= 0) {
      return [];
    }

    const clients: SearchClientDto[] = ormClients.map(function (
      ormClient,
    ) {
      const clientDto = new SearchClientDto();
      clientDto.id = ormClient.id.value;
      clientDto.firstName = ormClient.name.firstName;
      clientDto.lastName = ormClient.name.lastName;
      clientDto.email = ormClient.email.value;
      clientDto.myLiking = ormClient.myLiking;
      clientDto.description = ormClient.description;

      return clientDto;
    });

    return clients;
  }
}
