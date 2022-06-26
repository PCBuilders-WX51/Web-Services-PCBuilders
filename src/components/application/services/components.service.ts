import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { GetComponentDto } from "../dto/queries/get-component.dto";
import { GetComponentsQuery } from "../queries/get-components.query";
import { GetComponentResponseDto } from "../dto/response/get-component.response.dto";
import { GetComponentByIdQuery } from "../queries/get-component-by-id.query";
import { RegisterComponentRequestDto } from "../dto/request/register-component-request.dto";
import { RegisterComponentResponseDto } from "../dto/response/register-component-response.dto";
import { RegisterComponentCommand } from "../commands/register-component.command";
import { RegisterComponentValidator } from "../validators/register-component.validator";
import { StateType } from "../../domain/enums/state-type.enum";
import { EditComponentCommand } from "../commands/edit-component.command";
import { EditComponentRequestDto } from "../dto/request/edit-component-request.dto";
import { EditComponentResponseDto } from "../dto/response/edit-component-response.dto";
import { EditComponentValidator } from "../validators/edit-component.validator";
import { ComponentsTypeOrm } from "../../infrastructure/persistence/typeorm/entities/components.type.orm";
import { RemoveComponentResponseDto } from "../dto/response/remove-component-response.dto";
import { RemoveComponentCommand } from "../commands/remove-component.command";
import { StateTypeMapper } from "../mapper/state-type.mapper";
import { RemoveComponentValidator } from "../validators/remove-component.validator";

@Injectable()
export class ComponentsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerValidator: RegisterComponentValidator,
    private editValidator: EditComponentValidator,
    private removeValidator: RemoveComponentValidator
  ) {}

  async getAll(): Promise<Result<AppNotification, GetComponentDto>> {
    const getAllComponents: GetComponentsQuery = new GetComponentsQuery();
    const componentsOrm = await this.queryBus.execute(getAllComponents);

    let stateString = StateTypeMapper.toTypeString(componentsOrm.state);

    const componentsDto: GetComponentResponseDto = new GetComponentResponseDto(
      componentsOrm.id,
      componentsOrm.companyId,
      componentsOrm.piece,
      componentsOrm.description,
      componentsOrm.announcementId,
      stateString,
      componentsOrm.date
    );
    return Result.ok(componentsDto);
  }

  async getById(id: number): Promise<Result<AppNotification, GetComponentResponseDto>> {
    const componentQuery: GetComponentByIdQuery = new GetComponentByIdQuery(id);
    const componentOrm = await this.queryBus.execute(componentQuery);

    let notification: AppNotification = new AppNotification();

    if (componentOrm == null) {
      notification.addError('Component not found', null);
      return Result.error(notification);
    }

    let stateString = StateTypeMapper.toTypeString(componentOrm.state);

    const componentDto: GetComponentResponseDto = new GetComponentResponseDto(
      Number(componentOrm.id.value),
      componentOrm.companyId,
      componentOrm.piece,
      componentOrm.description,
      componentOrm.announcementId,
      stateString,
      componentOrm.date.date
    );
    return Result.ok(componentDto);
  }

  async register(registerComponent: RegisterComponentRequestDto):
    Promise<Result<AppNotification, RegisterComponentResponseDto>> {

    const result: AppNotification = await this.registerValidator.validate(registerComponent);

    if (result.hasErrors()) {
      return Result.error(result);
    }

    const registerComponentCommand: RegisterComponentCommand = new RegisterComponentCommand(
      registerComponent.companyId,
      registerComponent.piece,
      registerComponent.description,
      registerComponent.announcementId,
      registerComponent.date
    );
    const componentId = await this.commandBus.execute(registerComponentCommand);

    let stateString = StateTypeMapper.toTypeString(StateType.Pending);

    const componentResponse = new RegisterComponentResponseDto(
      componentId,
      registerComponent.companyId,
      registerComponent.piece,
      registerComponent.description,
      registerComponent.announcementId,
      stateString,
      registerComponent.date
    );
    return Result.ok(componentResponse);
  }

  async edit(componentId: number, editComponent: EditComponentRequestDto):
    Promise<Result<AppNotification, EditComponentResponseDto>> {

    const result: AppNotification = await this.editValidator.validate(componentId, editComponent);

    if (result.hasErrors()) {
      return Result.error(result);
    }

    let editComponentCommand: EditComponentCommand = new EditComponentCommand(
      componentId, editComponent.state
    );

    const component: ComponentsTypeOrm = await this.commandBus.execute(editComponentCommand);

    let stateString = StateTypeMapper.toTypeString(component.state);

    const componentResponse: EditComponentResponseDto = new EditComponentResponseDto(
      componentId,
      component.companyId,
      component.piece,
      component.description,
      component.announcementId,
      stateString,
      component.date.date
    );

    return Result.ok(componentResponse);
  }

  async remove(companyId: number):
    Promise<Result<AppNotification, RemoveComponentResponseDto>>{

    const notification: AppNotification = await this.removeValidator.validate(companyId);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const removeComponentCommand: RemoveComponentCommand =
      new RemoveComponentCommand(companyId);

    const companyTypeORM = await this.commandBus.execute(removeComponentCommand);

    let stateString = StateTypeMapper.toTypeString(companyTypeORM.state);

    const removeComponentResponseDto: RemoveComponentResponseDto =
      new RemoveComponentResponseDto(
        companyTypeORM.id.value,
        companyTypeORM.companyId,
        companyTypeORM.piece,
        companyTypeORM.description,
        companyTypeORM.announcementId,
        stateString,
        companyTypeORM.date.date
      );

    return Result.ok(removeComponentResponseDto);
  }

}
