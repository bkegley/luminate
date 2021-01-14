import {IDomainEvent} from '../../DomainEvent'
import {GrinderBurrSetOption} from '../GrinderBurrSet'

export interface IGrinderUpdatedEventData {
  id: string
  name: string
  description: string
  burrSet: GrinderBurrSetOption
}

export interface IGrinderUpdatedEvent extends IDomainEvent<IGrinderUpdatedEventData> {}
