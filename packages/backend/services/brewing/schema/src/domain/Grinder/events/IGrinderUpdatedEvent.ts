import {IEvent} from '../../IEvent'
import {GrinderBurrSetEnum} from '../GrinderBurrSet'

export interface IGrinderUpdatedEventData {
  id: string
  name?: string
  description?: string
  burrSet?: GrinderBurrSetEnum
}

export interface IGrinderUpdatedEvent extends IEvent<IGrinderUpdatedEventData> {}
