import {IEvent} from '../../IEvent'
import {BrewerTypeOption} from '../BrewerType'

export interface IBrewerCreatedEventData {
  id: string
  name: string
  description?: string
  type?: BrewerTypeOption
}

export interface IBrewerCreatedEvent extends IEvent<IBrewerCreatedEventData> {}
