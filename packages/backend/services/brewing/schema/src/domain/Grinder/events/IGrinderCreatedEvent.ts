import {IEvent} from '../../IEvent'

export interface IGrinderCreatedEventData {
  id: string
  name: string
  description?: string
  burrSet?: any
}

export interface IGrinderCreatedEvent extends IEvent<IGrinderCreatedEventData> {}
