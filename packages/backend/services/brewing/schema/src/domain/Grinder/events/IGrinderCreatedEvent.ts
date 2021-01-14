import {IDomainEvent} from '../../DomainEvent'
import {GrinderBurrSetOption} from '../GrinderBurrSet'

export interface IGrinderCreatedEventData {
  id: string
  name: string
  description?: string
  burrSet?: GrinderBurrSetOption
}

export interface IGrinderCreatedEvent extends IDomainEvent<IGrinderCreatedEventData> {}
