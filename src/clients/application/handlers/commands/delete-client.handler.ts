import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteClientCommand } from '../../commands/delete-client.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeleteClientCommand)
export class DeleteClientHandler
  implements ICommandHandler<DeleteClientCommand>
{
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  async execute(command: DeleteClientCommand) {
    const id = command.id;

    const client = await this.clientRepository.findOne(id);
    await this.clientRepository.delete(id);

    return client;
  }
}
