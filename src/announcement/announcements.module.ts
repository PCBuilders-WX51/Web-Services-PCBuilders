import { RegisterAnnouncementHandler } from './application/handlers/commands/register-announcement.handler';
import { AnnouncementRegisteredHandler } from './application/handlers/events/announcement-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from './infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { CompanyTypeORM} from '../companies/infrastructure/persistence/typeorm/entities/company.typeorm';
import { AnnouncementController } from './api/announcement.controller';
import { AnnouncementsApplicationService } from './application/services/announcements-application.service';
import { RegisterAnnouncementValidator } from './application/validators/register-client.validator';
import { GetAnnouncementsHandler } from './application/handlers/queries/get-clients.handler';
import { Module } from '@nestjs/common';
import { GetAnnouncementByIdHandler } from './application/handlers/queries/get-client-by-id.gandler';
import { IdAnnouncementValidator } from './application/validators/id-client.validator';
import { DeleteAnnouncementHandler } from './application/handlers/commands/delete-announcement.handler';
import { UpdateAnnouncementHandler } from './application/handlers/commands/update-announcement.handler';
import { UpdateAnnouncementValidator } from './application/validators/update-client.validator';

export const CommandHandlers = [
  RegisterAnnouncementHandler,
  DeleteAnnouncementHandler,
  UpdateAnnouncementHandler,
];
export const EventHandlers = [AnnouncementRegisteredHandler];
export const QueryHandlers = [
  GetAnnouncementsHandler,
  GetAnnouncementByIdHandler,
];
export const Validators = [
  RegisterAnnouncementValidator,
  IdAnnouncementValidator,
  UpdateAnnouncementValidator,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([AnnouncementTypeORM, CompanyTypeORM]),
  ],
  controllers: [AnnouncementController],
  providers: [
    AnnouncementsApplicationService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class AnnouncementsModule {}
