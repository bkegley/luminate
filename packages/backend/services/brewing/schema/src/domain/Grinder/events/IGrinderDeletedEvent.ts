import {IEvent} from '../../IEvent'

export interface IGrinderDeletedEventData {
  id: string
}

export interface IGrinderDeletedEvent extends IEvent<IGrinderDeletedEventData> {}
