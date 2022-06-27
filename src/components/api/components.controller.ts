import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetComponentsQuery } from '../application/queries/get-components.query';
import { ComponentsService } from '../application/services/components.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { GetComponentResponseDto } from '../application/dto/response/get-component.response.dto';
import { RegisterComponentRequestDto } from '../application/dto/request/register-component-request.dto';
import { EditComponentCommand } from '../application/commands/edit-component.command';
import { GetComponentDto } from "../application/dto/queries/get-component.dto";
import { EditComponentResponseDto } from "../application/dto/response/edit-component-response.dto";
import { RemoveComponentResponseDto } from "../application/dto/response/remove-component-response.dto";

@ApiBearerAuth()
@ApiTags('components')
@Controller('components')
export class ComponentsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly componentsService: ComponentsService)
  {}

  @Get()
  @ApiOperation({ summary: 'Get all components' })
  @ApiResponse({
    status: 200,
    description: 'All components returned',
    type: GetComponentDto,
    isArray: true,
  })
  async getAll(@Res({ passthrough: true}) response): Promise<object> {
    try {
      const components = await this.queryBus.execute(new GetComponentsQuery());
      return ApiController.ok(response, components);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get component by id' })
  @ApiResponse({
    status: 200,
    description: 'Component returned',
    type: GetComponentDto,
  })
  async getById(@Param('id') componentId: number, @Res({passthrough: true}) response): Promise<object> {
    try {
      const result: Result<AppNotification, GetComponentResponseDto> =
        await this.componentsService.getById(componentId);
      if (result.isSuccess()){
        return ApiController.ok(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new component' })
  @ApiResponse({
    status: 201,
    description: 'Component created',
    type: GetComponentDto,
  })
  async registerComponent(
    @Body() registerComponentRequest: RegisterComponentRequestDto,
    @Res({ passthrough: true}) response
  ): Promise<object> {
    try {
      const result = await this.componentsService.register(registerComponentRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    }
    catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update component information' })
  @ApiResponse({
    status: 202,
    description: 'Component information updated',
    type: GetComponentDto,
  })
  async editComponent(
    @Param('id') componentId: number,
    @Body() editComponentCommand: EditComponentCommand,
    @Res({ passthrough: true }) response
  ) : Promise<object> {
    try {
      const result: Result<AppNotification, EditComponentResponseDto> =
        await this.componentsService.edit(componentId, editComponentCommand,);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete component by id' })
  @ApiResponse({
    status: 202,
    description: 'Component deleted',
    type: GetComponentDto,
  })
  async remove(
    @Param('id') componentId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RemoveComponentResponseDto> =
        await this.componentsService.remove(componentId);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
