import {BrewerTypeOption} from '../BrewerType'
import {IDomainEvent} from '../../DomainEvent'

export interface IBrewerUpdatedEventData {
  id: string
  name: string
  description?: string
  type?: BrewerTypeOption
}

export interface IBrewerUpdatedEvent extends IDomainEvent<IBrewerUpdatedEventData> {}
