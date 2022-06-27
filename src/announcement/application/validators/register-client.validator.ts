import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { Repository } from 'typeorm';
import { RegisterAnnouncementDto } from '../dtos/request/register-announcement-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

export class RegisterAnnouncementValidator {
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
  ) {}

  public async validate(
    registerAnnouncementRequestDto: RegisterAnnouncementDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const title: string =
      registerAnnouncementRequestDto.title.trim();

    if (title.length <= 0) {
      notification.addError('Announcement title is required', null);
    }

    const description: string =
      registerAnnouncementRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Announcement description is required', null);
    }

    const requiredLiking: string =
      registerAnnouncementRequestDto.requiredLiking.trim();

    if (requiredLiking.length <= 0) {
      notification.addError('Announcement requiredLiking is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    /*const companyId: number =
     registerAnnouncementRequestDto.companyId;
    const announcement: AnnouncementTypeORM = await this.announcementRepository
      .createQueryBuilder()
      .where('companyId = :companyId', { companyId })
      .getOne();

    if (announcement == null) {
      notification.addError('Announcement companyId is bad', null);
    }*/

    return notification;
  }
}