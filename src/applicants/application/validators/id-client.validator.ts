import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';

export class IdClientValidator {
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError(
        'The Client id must be a positive integer',
        null,
      );
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const client: ClientTypeORM = await this.clientRepository.findOne(
      id,
    );

    if (client == null) {
      notification.addError(`There is no client with id: ${id}`, null);
    }

    return notification;
  }
}
