import { Client } from '../../../../../../clients/domain/entities/client.entity';
import { ClientId } from '../../../../../../clients/domain/value-objects/client-id.value';
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
      params.myLiking,
      params.description,
    );
  }

  public withId(params: WithIdParams): Client {
    return new Client(
      params.clientId,
      params.name,
      params.email,
      params.password,
      params.myLiking,
      params.description,
    );
  }
}
