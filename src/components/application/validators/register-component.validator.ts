import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../../companies/infrastructure/persistence/typeorm/entities/company.typeorm';
import { getManager, Repository } from 'typeorm';
import { RegisterComponentRequestDto } from '../dto/request/register-component-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { DateCustom } from '../../domain/value-objects/date-custom';
import { ComponentsTypeOrm } from '../../infrastructure/persistence/typeorm/entities/components.type.orm';
import { AnnouncementTypeORM } from "../../../announcement/infrastructure/persistence/typeorm/entities/announcement.typeorm";

export class RegisterComponentValidator {
  constructor(
    @InjectRepository(CompanyTypeORM) private companyRepository: Repository<CompanyTypeORM>,
    @InjectRepository(AnnouncementTypeORM) private announcementRepository: Repository<AnnouncementTypeORM>
  ) {}

  public async validate(registerComponentRequest: RegisterComponentRequestDto): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const companyTypeOrm: CompanyTypeORM =
      await this.companyRepository.findOne(registerComponentRequest.companyId);
    if (companyTypeOrm == null){
      notification.addError('Company not found', null);
      return notification;
    }

    const announcementTypeOrm: AnnouncementTypeORM =
      await this.announcementRepository.findOne(registerComponentRequest.announcementId);
    if (announcementTypeOrm == null) {
      notification.addError('Announcement no found', null);
      return notification;
    }

    let manager = getManager();
    let sql = `
    SELECT
        *
    FROM 
        components a
    WHERE
        a.companyId = ${registerComponentRequest.companyId} &&
        a.piece = ${registerComponentRequest.piece} &&
        a.announcementId = ${registerComponentRequest.announcementId};
    `;

    let componentTypeOrm: ComponentsTypeOrm[] = await manager.query(sql);

    if (componentTypeOrm.length > 0) {
      notification.addError('Component has already been registered', null);
      return notification;
    }

    let date = DateCustom.create(registerComponentRequest.date);
    if (date.isFailure()) {
      notification.addError("Date incorrect", null);
    }

    return notification;
  }
}
