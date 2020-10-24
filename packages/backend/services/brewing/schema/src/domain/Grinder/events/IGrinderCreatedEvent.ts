import {IEvent} from '../../IEvent'

export interface IGrinderCreatedEventData {
  name: string
  description?: string
  burrSet?: any
}

export interface IGrinderCreatedEvent extends IEvent<IGrinderCreatedEventData> {}
