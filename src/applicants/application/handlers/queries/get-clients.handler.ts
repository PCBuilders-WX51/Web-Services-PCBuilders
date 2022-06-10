import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientsQuery } from '../../queries/get-clients.query';
import { getManager } from 'typeorm';
import { GetClientsDto } from '../../dtos/queries/get-clients.dto';

@QueryHandler(GetClientsQuery)
export class GetClientsHandler implements IQueryHandler<GetClientsQuery> {
  constructor() {}

  async execute(query: GetClientsQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        last_name as lastName,
        first_name as firstName,
        /*
        my_specialty as mySpecialty,
        my_experience as myExperience,
        */
        description,
        email,
        password
        /*
        name_github as nameGithub,
        img_client as imgClient
        */
    FROM
        clients
    ORDER BY
        last_name, first_name;  
    `;

    const ormClients = await manager.query(sql);

    if (ormClients.length <= 0) {
      return [];
    }

    const clients: GetClientsDto[] = ormClients.map(function (
      ormClient,
    ) {
      const clientDto = new GetClientsDto();
      clientDto.id = Number(ormClient.id);
      clientDto.firstName = ormClient.firstName;
      clientDto.lastName = ormClient.lastName;
      clientDto.email = ormClient.email;
      clientDto.password = ormClient.password;
      /*
      clientDto.mySpecialty = ormClient.mySpecialty;
      clientDto.myExperience = ormClient.myExperience;
      clientDto.description = ormClient.description;
      clientDto.nameGithub = ormClient.nameGithub;
      clientDto.imgClient = ormClient.imgClient;
       */

      return clientDto;
    });

    return clients;
  }
}
