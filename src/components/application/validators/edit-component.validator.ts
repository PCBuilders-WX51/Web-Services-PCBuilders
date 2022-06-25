import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "../../../common/application/app.notification";
import { ComponentsTypeOrm } from "../../infrastructure/persistence/typeorm/entities/components.type.orm";
import { EditComponentRequestDto } from "../dto/request/edit-component-request.dto";
import { StateType } from "../../domain/enums/state-type.enum";
import { StateTypeMapper } from "../mapper/state-type.mapper";

export class EditComponentValidator {
  constructor(
    @InjectRepository(ComponentsTypeOrm) private componentRepository: Repository<ComponentsTypeOrm>,
  ) {}

  public async validate(companyId: number, editComponentRequestDto: EditComponentRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const componentTypeOrm: ComponentsTypeOrm =
      await this.componentRepository.findOne(companyId);
    if (componentTypeOrm == null) {
      notification.addError('Component no found', null);
      return notification;
    }

    let stateString: StateType = StateTypeMapper.toTypeState(editComponentRequestDto.state);

    if (stateString == StateType.NotFound) {
      notification.addError('Unrecognized state', null);
      return notification;
    }

    return notification;
  }
}
