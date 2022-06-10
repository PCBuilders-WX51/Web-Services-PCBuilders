import { Client } from '../../../../../../applicants/domain/entities/client.entity';
import { ClientId } from '../../../../../../applicants/domain/value-objects/client-id.value';
import { UserAbstractFactory } from '../abstract/user-abstract.factory';
import { CreateFromParams } from '../params/create-from.params';
import { WithIdParams } from '../params/with-id.params';

export class ClientFactory extends UserAbstractFactory {
  public createFrom(params: CreateFromParams): Client {
    return new Client(
      ClientId.create(0),
      params.name,
      params.email,
      params.password,
      params.mySpecialty,
      params.myExperience,
      params.description,
      params.nameGithub,
      params.imgClient,
    );
  }

  public withId(params: WithIdParams): Client {
    return new Client(
      params.clientId,
      params.name,
      params.email,
      params.password,
      params.mySpecialty,
      params.myExperience,
      params.description,
      params.nameGithub,
      params.imgClient,
    );
  }
}
