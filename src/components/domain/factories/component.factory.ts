import { ComponentsEntity } from '../entities/components.entity';
import { Id } from '../../../common/domain/value-objects/id.value';
import { DateCustom } from '../value-objects/date-custom';
import { StateType } from '../enums/state-type.enum';

export class ComponentFactory {

  public static createFrom(id: number = 0, companyId: number, piece: string, description: string, announcementId: number, state: StateType, date: DateCustom) {
    return new ComponentsEntity(Id.create(id), companyId, piece, description, announcementId, state, date);
  }
}
