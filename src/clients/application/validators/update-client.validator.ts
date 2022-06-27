import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { UpdateClientRequestDto } from '../dtos/request/update-client-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Result } from 'typescript-result';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';

export class UpdateClientValidator {
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateClientRequestDto: UpdateClientRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateClientRequestDto.id;

    if (id == null) {
      notification.addError('Client id is required', null);
    }

    const firstName: string = updateClientRequestDto.firstName.trim();

    if (firstName.length <= 0) {
      notification.addError('Client firstname is required', null);
    }

    const lastName: string = updateClientRequestDto.lastName.trim();

    if (lastName.length <= 0) {
      notification.addError('Client lastName is required', null);
    }

    const email: string = updateClientRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Client email is required', null);
    }

    const password: string = updateClientRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Client password is required', null);
    }

    const myLiking: string = updateClientRequestDto.myLiking.trim();

    if (myLiking.length <= 0) {
      notification.addError('Client myLiking is required', null);
    }

    const description: string = updateClientRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Client description is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const nameResult: Result<AppNotification, Name> = Name.create(
      firstName,
      lastName,
    );

    if (nameResult.isFailure()) {
      notification.addErrors(nameResult.error.getErrors());
    }

    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    const passwordResult: Result<AppNotification, Password> =
      Password.create(password);

    if (passwordResult.isFailure()) {
      notification.addErrors(passwordResult.error.getErrors());
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const client: ClientTypeORM = await this.clientRepository.findOne(
      targetId,
    );

    let otherClient: ClientTypeORM =
      await this.clientRepository.findOne(id);

    if (
      otherClient != null &&
      otherClient.id.value !== client.id.value
    ) {
      notification.addError(
        `There is already an client with id: ${id}`,
        null,
      );
    }

    otherClient = await this.clientRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (
      client != null &&
      otherClient.email.value !== client.email.value
    ) {
      notification.addError('Client email is taken', null);
    }

    return notification;
  }
}
