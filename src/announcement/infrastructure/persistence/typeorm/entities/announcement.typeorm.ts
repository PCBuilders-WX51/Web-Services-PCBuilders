import { Column, Entity, Unique } from 'typeorm';
import { AnnouncementIdTypeORM } from './announcement.id.typeorm';
import { CompanyIdTypeORM } from '../../../../../companies/infrastructure/persistence/typeorm/entities/company.id.typeorm';

@Entity('announcements')
export class AnnouncementTypeORM {
  @Column((type) => AnnouncementIdTypeORM, { prefix: false })
  public id: AnnouncementIdTypeORM;

  @Column('varchar', { name: 'title', length: 500, nullable: false })
  public title: string;

  @Column('varchar', { name: 'description', length: 500, nullable: false })
  public description: string;

  @Column('varchar', { name: 'requiredLiking', length: 500, nullable: false })
  public requiredLiking: string;

  @Column('bool', { name: 'visible', nullable: false })
  public visible: boolean;

  @Column('int', { name: 'companyId', nullable: false })
  public companyId: number;
}
