import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ComponentsTypeOrm } from "../../../infrastructure/persistence/typeorm/entities/components.type.orm";
import { Repository } from "typeorm";
import { ComponentsEntity } from "../../../domain/entities/components.entity";
import { DateCustom } from "../../../domain/value-objects/date-custom";
import { ComponentFactory } from "../../../domain/factories/component.factory";
import { ComponentMapper } from "../../mapper/component.mapper";
import { EditComponentCommand } from "../../commands/edit-component.command";
import { StateTypeMapper } from "../../mapper/state-type.mapper";
import { StateType } from "../../../domain/enums/state-type.enum";
import { Id } from "../../../../common/domain/value-objects/id.value";

@CommandHandler(EditComponentCommand)
export class EditComponentHandler implements ICommandHandler<EditComponentCommand>{
  constructor(
    @InjectRepository(ComponentsTypeOrm) private componentRepository: Repository<ComponentsTypeOrm>,
    private publisher: EventPublisher) {}

  async execute(command: EditComponentCommand): Promise<any> {

    let componentOriginal: ComponentsTypeOrm = await this.componentRepository.findOne(command.id);

    let state = StateTypeMapper.toTypeState(command.state);

    let component: ComponentsEntity =
      ComponentFactory.createFrom(componentOriginal.id.value, componentOriginal.companyId, componentOriginal.piece, componentOriginal.description, componentOriginal.announcementId, state ,DateCustom.from(componentOriginal.date.date));

    let componentTypeOrm: ComponentsTypeOrm = ComponentMapper.toTypeOrm(component);

    await this.componentRepository.update(command.id, componentTypeOrm);

    component.changeId(Id.create(componentOriginal.id.value));
    component = this.publisher.mergeObjectContext(component);
    if (state == StateType.Accepted) component.accepted();
    else if (state == StateType.Denied) component.denied();
    return componentTypeOrm;
  }
}
