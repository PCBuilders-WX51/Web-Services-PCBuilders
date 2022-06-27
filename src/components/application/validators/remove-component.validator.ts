import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "../../../common/application/app.notification";
import { ComponentsTypeOrm } from "../../infrastructure/persistence/typeorm/entities/components.type.orm";

export class RemoveComponentValidator {
  constructor(
    @InjectRepository(ComponentsTypeOrm) private componentRepository: Repository<ComponentsTypeOrm>,
  ) {}

  public async validate(companyId: number): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const componentTypeOrm: ComponentsTypeOrm =
      await this.componentRepository.findOne(companyId);

    if (componentTypeOrm == null) {
      notification.addError('Component no found', null);
    }

    return notification;
  }
}
