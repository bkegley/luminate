import {RefreshTokenCreatedEvent} from './RefreshTokenCreatedEvent'
import {IEventHandler, EventsHandler} from '@nestjs/cqrs'

@EventsHandler(RefreshTokenCreatedEvent)
export class RefreshTokenCreatedEventHandler implements IEventHandler<RefreshTokenCreatedEvent> {
  async handle(event: RefreshTokenCreatedEvent) {
    console.log({event})
  }
}
