import {EventType, IEvent} from '.'
import {Brewer} from '../Brewer'
import {BrewerDTO} from '../../dtos'
import {BrewerMapper} from '../../mappers'

export class BrewerUpdatedEvent implements IEvent<BrewerDTO> {
  timestamp = new Date()
  event = EventType.BREWER_UPDATED_EVENT
  data: BrewerDTO

  constructor(brewer: Brewer) {
    this.data = BrewerMapper.toPersistence(brewer)
  }
}
