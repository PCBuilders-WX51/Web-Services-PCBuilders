import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterClientValidator } from '../validators/register-client.validator';
import { RegisterClientRequestDto } from '../dtos/request/register-client-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterClientResponseDto } from '../dtos/response/register-client-response.dto';
import { RegisterClientCommand } from '../commands/register-client.command';
import { GetClientByIdResponseDto } from '../dtos/response/get-client-by-id-response.dto';
import { IdClientValidator } from '../validators/id-client.validator';
import { GetClientByIdQuery } from '../queries/get-client-by-id.query';
import { DeleteClientResponseDto } from '../dtos/response/delete-client-response.dto';
import { DeleteClientCommand } from '../commands/delete-client.command';
import { UpdateClientRequestDto } from '../dtos/request/update-client-request.dto';
import { UpdateClientResponseDto } from '../dtos/response/update-client-response.dto';
import { UpdateClientValidator } from '../validators/update-client.validator';
import { UpdateClientCommand } from '../commands/update-client.command';

@Injectable()
export class ClientsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerClientValidator: RegisterClientValidator,
    private idValidator: IdClientValidator,
    private updateClientValidator: UpdateClientValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetClientByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getClientByIdQuery: GetClientByIdQuery =
      new GetClientByIdQuery(id);

    const clientTypeORM = await this.queryBus.execute(getClientByIdQuery);

    const getByIdResponseDto: GetClientByIdResponseDto =
      new GetClientByIdResponseDto(
        clientTypeORM.id.value,
        clientTypeORM.name.firstName,
        clientTypeORM.name.lastName,
        clientTypeORM.email.value,
        clientTypeORM.password.value,
        clientTypeORM.myLiking,
        clientTypeORM.description,
      );

    return Result.ok(getByIdResponseDto);
  }

  async register(
    registerClientRequestDto: RegisterClientRequestDto,
  ): Promise<Result<AppNotification, RegisterClientResponseDto>> {
    const notification: AppNotification =
      await this.registerClientValidator.validate(
        registerClientRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const registerClientCommand: RegisterClientCommand =
      new RegisterClientCommand(
        registerClientRequestDto.firstName,
        registerClientRequestDto.lastName,
        registerClientRequestDto.email,
        registerClientRequestDto.password,
        registerClientRequestDto.myLiking,
        registerClientRequestDto.description,
      );
    const clientId = await this.commandBus.execute(registerClientCommand);

    const registerClientResponseDto: RegisterClientResponseDto =
      new RegisterClientResponseDto(
        clientId,
        registerClientRequestDto.firstName,
        registerClientRequestDto.lastName,
        registerClientRequestDto.email,
        registerClientRequestDto.password,
        registerClientRequestDto.myLiking,
        registerClientRequestDto.description,
      );

    return Result.ok(registerClientResponseDto);
  }

  async update(
    id: number,
    updateClientRequestDto: UpdateClientRequestDto,
  ): Promise<Result<AppNotification, UpdateClientResponseDto>> {
    const notification: AppNotification =
      await this.updateClientValidator.validate(
        id,
        updateClientRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateClientCommand: UpdateClientCommand =
      new UpdateClientCommand(
        id,
        updateClientRequestDto.id,
        updateClientRequestDto.firstName,
        updateClientRequestDto.lastName,
        updateClientRequestDto.email,
        updateClientRequestDto.password,
        updateClientRequestDto.myLiking,
        updateClientRequestDto.description,
      );
    const clientTypeORM = await this.commandBus.execute(
      updateClientCommand,
    );

    const updateClientResponseDto: UpdateClientResponseDto =
      new UpdateClientResponseDto(
        clientTypeORM.id.value,
        clientTypeORM.name.firstName,
        clientTypeORM.name.lastName,
        clientTypeORM.email.value,
        clientTypeORM.password.value,
        clientTypeORM.myLiking,
        clientTypeORM.description,
      );

    return Result.ok(updateClientResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteClientResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteClientCommand: DeleteClientCommand =
      new DeleteClientCommand(id);

    const clientTypeORM = await this.commandBus.execute(
      deleteClientCommand,
    );

    const deleteClientResponseDto: DeleteClientResponseDto =
      new DeleteClientResponseDto(
        clientTypeORM.id.value,
        clientTypeORM.name.firstName,
        clientTypeORM.name.lastName,
        clientTypeORM.email.value,
        clientTypeORM.password.value,
        clientTypeORM.myLiking,
        clientTypeORM.description,
      );

    return Result.ok(deleteClientResponseDto);
  }
}
