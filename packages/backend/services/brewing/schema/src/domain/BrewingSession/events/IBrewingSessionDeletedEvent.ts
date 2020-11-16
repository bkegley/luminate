import {IEvent} from '../../IEvent'

export interface IBrewingSessionDeletedEventData {
  id: string
}

export interface IBrewingSessionDeletedEvent extends IEvent<IBrewingSessionDeletedEventData> {}
