import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ClientsApplicationService } from '../application/services/clients-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterClientRequestDto } from '../application/dtos/request/register-client-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterClientResponseDto } from '../application/dtos/response/register-client-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetClientsQuery } from '../application/queries/get-clients.query';
import { GetClientByIdDto } from '../application/dtos/queries/get-client-by-id.dto';
import { DeleteClientResponseDto } from '../application/dtos/response/delete-client-response.dto';
import { UpdateClientRequestDto } from '../application/dtos/request/update-client-request.dto';
import { UpdateClientResponseDto } from '../application/dtos/response/update-client-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetClientsDto } from '../application/dtos/queries/get-client.dto';

@ApiBearerAuth()
@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientsApplicationService: ClientsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Clients' })
  @ApiResponse({
    status: 200,
    description: 'All clients returned',
    type: GetClientsDto,
    isArray: true,
  })
  async getClients(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const clients = await this.queryBus.execute(new GetClientsQuery());
      return ApiController.ok(response, clients);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Client by Id' })
  @ApiResponse({
    status: 200,
    description: 'Client returned',
    type: GetClientsDto,
  })
  async getClientById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetClientByIdDto> =
        await this.clientsApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new Client' })
  @ApiResponse({
    status: 201,
    description: 'Client created',
    type: GetClientsDto,
  })
  async register(
    @Body() registerClientRequestDto: RegisterClientRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterClientResponseDto> =
        await this.clientsApplicationService.register(
          registerClientRequestDto,
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update client information' })
  @ApiResponse({
    status: 204,
    description: 'Client information updated',
    type: GetClientsDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateClientRequestDto: UpdateClientRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateClientResponseDto> =
        await this.clientsApplicationService.update(
          id,
          updateClientRequestDto,
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Client by Id' })
  @ApiResponse({
    status: 204,
    description: 'Client deleted',
    type: GetClientsDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteClientResponseDto> =
        await this.clientsApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
