import {IEventHandler, EventsHandler} from '@nestjs/cqrs'
import {RefreshTokenRevokedEvent} from './RefreshTokenRevokedEvent'

@EventsHandler(RefreshTokenRevokedEvent)
export class RefreshTokenRevokedEventHandler implements IEventHandler<RefreshTokenRevokedEvent> {
  async handle(event: any) {
    console.log({event})
  }
}
