import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { Repository } from 'typeorm';
import { UpdateAnnouncementDto } from '../dtos/request/update-client-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';

export class UpdateAnnouncementValidator {
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateAnnouncementRequestDto: UpdateAnnouncementDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateAnnouncementRequestDto.id;

    if (id == null) {
      notification.addError('Announcement id is required', null);
    }

    const title: string = updateAnnouncementRequestDto.title.trim();

    if (title.length <= 0) {
      notification.addError('Announcement title is required', null);
    }

    const description: string =
      updateAnnouncementRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Announcement description is required', null);
    }

    const requiredLiking: string =
      updateAnnouncementRequestDto.requiredLiking.trim();

    if (requiredLiking.length <= 0) {
      notification.addError('Announcement requiredLiking is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    return notification;
  }
}
