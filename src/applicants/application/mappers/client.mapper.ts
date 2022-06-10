import { Client } from '../../domain/entities/client.entity';
import { ClientTypeORM } from '../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { ClientIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/client.id.typeorm';

export class ClientMapper {
  public static toTypeORM(client: Client): ClientTypeORM {
    const clientTypeORM: ClientTypeORM = new ClientTypeORM();

    clientTypeORM.id = ClientIdTypeORM.from(client.getId().getValue());
    clientTypeORM.name = NameTypeORM.from(
      client.getName().getFirstName(),
      client.getName().getLastName(),
    );
    clientTypeORM.email = EmailTypeORM.from(client.getEmail().getValue());
    clientTypeORM.password = EmailTypeORM.from(
      client.getPassword().getValue(),
    );
    /*
    clientTypeORM.mySpecialty = client.getMySpecialty();
    clientTypeORM.myExperience = client.getMyExperience();
    clientTypeORM.description = client.getDescription();
    clientTypeORM.nameGithub = client.getNameGithub();
    clientTypeORM.imgClient = client.getImgClient();
     */

    return clientTypeORM;
  }
}
