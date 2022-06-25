import { ComponentsEntity } from '../../domain/entities/components.entity';
import { ComponentsTypeOrm } from '../../infrastructure/persistence/typeorm/entities/components.type.orm';
import { DateCustomTypeOrm } from '../../infrastructure/persistence/typeorm/entities/date-custom-type.orm';

export class ComponentMapper {
  public static toTypeOrm(component: ComponentsEntity) {
    const componentTypeOrm: ComponentsTypeOrm = new ComponentsTypeOrm();
    componentTypeOrm.companyId = component.showcompanyId();
    componentTypeOrm.piece = component.showpiece();
    componentTypeOrm.description = component.showdescription();
    componentTypeOrm.announcementId = component.showAnnouncementId();
    componentTypeOrm.state = component.showState();
    componentTypeOrm.date = DateCustomTypeOrm.from(component.showDatePostulation());
    return componentTypeOrm;
  }
}
