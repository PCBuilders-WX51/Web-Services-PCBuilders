import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterComponentCommand } from '../../commands/register-component.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentsTypeOrm } from '../../../infrastructure/persistence/typeorm/entities/components.type.orm';
import { Repository } from 'typeorm';
import { ComponentsEntity } from '../../../domain/entities/components.entity';
import { DateCustom } from '../../../domain/value-objects/date-custom';
import { ComponentFactory } from '../../../domain/factories/component.factory';
import { ComponentMapper } from '../../mapper/component.mapper';
import { Id } from '../../../../common/domain/value-objects/id.value';
import { StateType } from '../../../domain/enums/state-type.enum';

@CommandHandler(RegisterComponentCommand)
export class RegisterComponentHandler implements ICommandHandler<RegisterComponentCommand>{
  constructor(
    @InjectRepository(ComponentsTypeOrm) private componentRepository: Repository<ComponentsTypeOrm>,
    private publisher: EventPublisher) {}

  async execute(command: RegisterComponentCommand): Promise<any> {
    let componentId: number = 0;

    let component: ComponentsEntity =
      ComponentFactory.createFrom(componentId,command.companyId, command.piece, command.description, command.announcementId, StateType.Pending ,DateCustom.from(command.date));

    let componentTypeOrm: ComponentsTypeOrm = ComponentMapper.toTypeOrm(component);

    componentTypeOrm = await this.componentRepository.save(componentTypeOrm);

    if (componentTypeOrm == null) {
      return componentId;
    }

    componentId = componentTypeOrm.id.value;
    component.changeId(Id.create(componentTypeOrm.id.value));
    component = this.publisher.mergeObjectContext(component);
    component.created(); // Domain event
    component.commit();
    return componentId;
  }
}
