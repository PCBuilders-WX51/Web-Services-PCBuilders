import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveComponentCommand } from "../../commands/remove-component.command";
import { ComponentsTypeOrm } from "../../../infrastructure/persistence/typeorm/entities/components.type.orm";

@CommandHandler(RemoveComponentCommand)
export class RemoveComponentHandler
  implements ICommandHandler<RemoveComponentCommand>
{
  constructor(
    @InjectRepository(ComponentsTypeOrm)
    private companyRepository: Repository<ComponentsTypeOrm>,
  ) {}

  async execute(command: RemoveComponentCommand) {
    const id = command.id;

    const component = await this.companyRepository.findOne(id);
    await this.companyRepository.delete(id);

    return component;
  }
}
