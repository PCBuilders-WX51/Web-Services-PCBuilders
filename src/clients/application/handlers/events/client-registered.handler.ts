import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { ClientRegisteredEvent } from '../../../domain/events/client-registered.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ClientRegisteredEvent)
export class ClientRegisteredHandler
  implements IEventHandler<ClientRegisteredEvent>
{
  constructor() {}

  handle(event: ClientRegisteredEvent) {
    console.log(event);
  }
}
