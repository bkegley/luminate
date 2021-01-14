import {IDomainEvent} from '../../DomainEvent'

export interface IRecipeCreatedEventData {
  id: string
  name: string
  grinderId?: string | number
  grindSetting?: string
  brewerId?: string | number
  note?: string
}

export interface IRecipeCreatedEvent extends IDomainEvent<IRecipeCreatedEventData> {}
