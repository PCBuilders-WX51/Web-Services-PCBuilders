import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClientCommand } from '../../commands/update-client.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../../domain/entities/client.entity';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { ClientId } from '../../../domain/value-objects/client-id.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { ClientMapper } from '../../mappers/client.mapper';
import { UserFactoryMethod } from '../../../../common/domain/factories/user/factories/user.factory.method';
import { UserAbstractFactory } from '../../../../common/domain/factories/user/factories/abstract/user-abstract.factory';
import { UserType } from '../../../../common/domain/factories/user/enum/user-type';

@CommandHandler(UpdateClientCommand)
export class UpdateClientHandler
  implements ICommandHandler<UpdateClientCommand>
{
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  async execute(command: UpdateClientCommand) {
    const idResult: ClientId = ClientId.create(command.id);

    const nameResult: Result<AppNotification, Name> = Name.create(
      command.firstName,
      command.lastName,
    );

    if (nameResult.isFailure()) {
      return null;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(
      command.email,
    );

    if (emailResult.isFailure()) {
      return null;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return null;
    }

    const userFactory: UserAbstractFactory = UserFactoryMethod.getType(
      UserType.Client,
    );

    const client: Client = userFactory.withId({
      clientId: idResult,
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

    const clientTypeORM = ClientMapper.toTypeORM(client);
    await this.clientRepository.update(command.targetId, clientTypeORM);

    return clientTypeORM;
  }
}
