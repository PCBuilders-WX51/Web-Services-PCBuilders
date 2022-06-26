import { RegisterClientHandler } from './application/handlers/commands/register-client.handler';
import { ClientRegisteredHandler } from './application/handlers/events/client-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientTypeORM } from './infrastructure/persistence/typeorm/entities/client.typeorm';
import { ClientController } from './api/client.controller';
import { ClientsApplicationService } from './application/services/clients-application.service';
import { RegisterClientValidator } from './application/validators/register-client.validator';
import { GetClientsHandler } from './application/handlers/queries/get-clients.handler';
import { Module } from '@nestjs/common';
import { GetClientByIdHandler } from './application/handlers/queries/get-client-by-id.handler';
import { IdClientValidator } from './application/validators/id-client.validator';
import { DeleteClientHandler } from './application/handlers/commands/delete-client.handler';
import { UpdateClientHandler } from './application/handlers/commands/update-client.handler';
import { UpdateClientValidator } from './application/validators/update-client.validator';
import { SearchClientHandler } from './application/handlers/queries/search-client.handler';
import { KeywordSearchClientValidator } from './application/validators/keyword-search-client.validator';
import { SearchClientService } from './application/services/search-client.service';
import { SearchClientController } from './api/search-client.controller';

export const CommandHandlers = [
  RegisterClientHandler,
  DeleteClientHandler,
  UpdateClientHandler,
];
export const EventHandlers = [ClientRegisteredHandler];
export const QueryHandlers = [
  GetClientsHandler,
  GetClientByIdHandler,
  SearchClientHandler,
];
export const Validators = [
  RegisterClientValidator,
  IdClientValidator,
  UpdateClientValidator,
  KeywordSearchClientValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ClientTypeORM])],
  controllers: [ClientController, SearchClientController],
  providers: [
    ClientsApplicationService,
    SearchClientService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ClientsModule {}
