import {IEvent} from './IEvent'
import {EventType} from './EventType'
import {Brewer} from '../Brewer'
import {BrewerDTO} from '../../dtos'
import {BrewerMapper} from '../../mappers'

export class BrewerCreatedEvent implements IEvent<BrewerDTO> {
  timestamp = new Date()
  event = EventType.BREWER_CREATED_EVENT
  data: BrewerDTO

  constructor(brewer: Brewer) {
    this.data = BrewerMapper.toPersistence(brewer)
  }
}
