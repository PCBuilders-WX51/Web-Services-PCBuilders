import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { RegisterClientRequestDto } from '../dtos/request/register-client-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

export class RegisterClientValidator {
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  public async validate(
    registerClientRequestDto: RegisterClientRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const firstName: string = registerClientRequestDto.firstName.trim();

    if (firstName.length <= 0) {
      notification.addError('Client firstname is required', null);
    }

    const lastName: string = registerClientRequestDto.lastName.trim();

    if (lastName.length <= 0) {
      notification.addError('Client lastName is required', null);
    }

    const email: string = registerClientRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Client email is required', null);
    }

    const password: string = registerClientRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Client password is required', null);
    }

    const myLiking: string = registerClientRequestDto.myLiking.trim();

    if (myLiking.length <= 0) {
      notification.addError('Client myLiking is required', null);
    }

    const description: string = registerClientRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Client description is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const client: ClientTypeORM = await this.clientRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (client != null) {
      notification.addError('Client email is taken', null);
    }

    return notification;
  }
}
