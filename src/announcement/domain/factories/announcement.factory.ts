import { Announcement } from '../entities/announcement.entity';
import { CompanyId } from '../../../companies/domain/value-objects/company-id.value';
import { AnnouncementId} from '../value-objects/announcement-id.value';
import { Company } from '../../../companies/domain/entities/company.entity';

export class AnnouncementFactory{
  public static createFrom(
    title:string,
    description:string,
    requiredLiking:string,
    visible:boolean,
    companyId: number,
  ): Announcement{
    return new Announcement(
      AnnouncementId.create(0),
      title,
      description,
      requiredLiking,
      visible,
      companyId,
    );
  }
  public static withId(
    AnnouncementId: AnnouncementId,
    title: string,
    description: string,
    requiredLiking:string,
    visible:boolean,
    companyId:number
  ): Announcement{
    return new Announcement(
      AnnouncementId,
      title,
      description,
      requiredLiking,
      visible,
      companyId,
    );
  }

}