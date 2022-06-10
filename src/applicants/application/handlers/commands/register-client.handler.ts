import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterClientCommand } from '../../commands/register-client.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { ClientFactory } from '../../../../common/domain/factories/user/factories/concrete/client.factory';
import { Client } from '../../../domain/entities/client.entity';
import { ClientMapper } from '../../mappers/client.mapper';
import { ClientId } from '../../../domain/value-objects/client-id.value';
import { UserAbstractFactory } from '../../../../common/domain/factories/user/factories/abstract/user-abstract.factory';
import { UserFactoryMethod } from '../../../../common/domain/factories/user/factories/user.factory.method';
import { UserType } from '../../../../common/domain/factories/user/enum/user-type';

@CommandHandler(RegisterClientCommand)
export class RegisterClientHandler
  implements ICommandHandler<RegisterClientCommand>
{
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterClientCommand) {
    const nameResult: Result<AppNotification, Name> = Name.create(
      command.firstName,
      command.lastName,
    );

    if (nameResult.isFailure()) {
      return 0;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(
      command.email,
    );

    if (emailResult.isFailure()) {
      return 0;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return 0;
    }

    const userFactory: UserAbstractFactory = UserFactoryMethod.getType(
      UserType.Client,
    );

    let client: Client = userFactory.createFrom({
      name: nameResult.value,
      email: emailResult.value,
      password: passwordResult.value,
      /*
      mySpecialty: command.mySpecialty,
      myExperience: command.myExperience,
      description: command.description,
      nameGithub: command.nameGithub,
      imgClient: command.imgClient,
       */
    });

    let clientTypeORM = ClientMapper.toTypeORM(client);
    clientTypeORM = await this.clientRepository.save(clientTypeORM);

    if (clientTypeORM == null) {
      return 0;
    }

    const clientId = Number(clientTypeORM.id.value);
    client.changeId(ClientId.create(clientId));

    client = this.publisher.mergeObjectContext(client);
    client.register();
    client.commit();

    return clientId;
  }
}
