import {IEvent} from '../../IEvent'

export interface IBrewerDeletedEventData {
  id: string
}

export interface IBrewerDeletedEvent extends IEvent<IBrewerDeletedEventData> {}
