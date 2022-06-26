import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnnouncementsQuery } from '../../queries/get-announcement-query';
import { getManager } from 'typeorm';
import { GetAnnouncementsDto } from '../../dtos/queries/get-announcements.dto';

@QueryHandler(GetAnnouncementsQuery)
export class GetAnnouncementsHandler implements IQueryHandler<GetAnnouncementsQuery> {
  constructor() {}

  async execute(query: GetAnnouncementsQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        title,
        description,
        required_liking as requiredLiking,
        visible,
        company_id as companyId
    FROM
        companies
    ORDER BY
        name_company;  
    `;

    const ormAnnouncements = await manager.query(sql);

    if (ormAnnouncements.length <= 0) {
      return [];
    }

    const Announcements: GetAnnouncementsDto[] = ormAnnouncements.map(function (
      ormAnnouncement,
    ) {
      const announcementDto = new GetAnnouncementsDto();
      announcementDto.id = Number(ormAnnouncement.id);
      announcementDto.title=ormAnnouncement.title;
      announcementDto.description=ormAnnouncement.description;
      announcementDto.requiredLiking=ormAnnouncement.requiredLiking;
      announcementDto.visible=ormAnnouncement.visible;
      announcementDto.companyId=ormAnnouncement.companyId;
      return announcementDto;
    });

    return Announcements;
  }
}
