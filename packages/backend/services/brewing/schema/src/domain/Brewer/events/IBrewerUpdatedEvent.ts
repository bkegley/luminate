import {IEvent} from '../../IEvent'
import {BrewerTypeOption} from '../BrewerType'

export interface IBrewerUpdatedEventData {
  id: string
  name: string
  description?: string
  type?: BrewerTypeOption
}

export interface IBrewerUpdatedEvent extends IEvent<IBrewerUpdatedEventData> {}
