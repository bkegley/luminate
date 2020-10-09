import {IEvent} from './IEvent'
import {BrewerTypeEnum} from '../BrewerType'

export interface IBrewerCreatedEventData {
  id: string
  name: string
  description?: string
  type?: BrewerTypeEnum
}

export interface IBrewerCreatedEvent extends IEvent<IBrewerCreatedEventData> {}
