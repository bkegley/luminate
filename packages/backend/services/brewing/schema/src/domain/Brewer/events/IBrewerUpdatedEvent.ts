import {IEvent} from '../../IEvent'
import {BrewerTypeEnum} from '../BrewerType'

export interface IBrewerUpdatedEventData {
  id: string
  name?: string
  description?: string
  type?: BrewerTypeEnum
}

export interface IBrewerUpdatedEvent extends IEvent<IBrewerUpdatedEventData> {}
