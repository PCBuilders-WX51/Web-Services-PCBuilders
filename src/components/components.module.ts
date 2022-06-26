import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ComponentsTypeOrm } from './infrastructure/persistence/typeorm/entities/components.type.orm';
import { ComponentsController } from './api/components.controller';
import { ComponentsService } from './application/services/components.service';
import { RegisterComponentHandler } from './application/handlers/commands/register-component.handler';
import { GetComponentsHandler } from './application/handlers/queries/get-components.handler';
import { GetComponentByIdHandler } from './application/handlers/queries/get-component-by-id.handler';
import { CompanyTypeORM } from '../companies/infrastructure/persistence/typeorm/entities/company.typeorm';
import { RegisterComponentValidator } from './application/validators/register-component.validator';
import { AnnouncementTypeORM } from "../announcement/infrastructure/persistence/typeorm/entities/announcement.typeorm";
import { EditComponentHandler } from "./application/handlers/commands/edit-component.handler";
import { EditComponentValidator } from "./application/validators/edit-component.validator";
import { RemoveComponentHandler } from "./application/handlers/commands/remove-component.handler";
import { RemoveComponentValidator } from "./application/validators/remove-component.validator";

export const QueryHandlers =
  [
    GetComponentsHandler,
    GetComponentByIdHandler
  ];
export const CommandHandler =
  [
    RegisterComponentHandler,
    EditComponentHandler,
    RemoveComponentHandler
  ];
export const Validators =
  [
    RegisterComponentValidator,
    EditComponentValidator,
    RemoveComponentValidator
  ];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ComponentsTypeOrm, AnnouncementTypeORM, CompanyTypeORM])],
  controllers: [ComponentsController],
  providers: [
    ComponentsService,
    ...QueryHandlers,
    ...CommandHandler,
    ...Validators
  ],
})
export class ComponentsModule {}
