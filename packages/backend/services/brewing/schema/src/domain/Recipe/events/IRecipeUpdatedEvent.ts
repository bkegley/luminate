import {IDomainEvent} from '../../DomainEvent'

export interface IRecipeUpdatedEventData {
  id: string
  name?: string
  grinderId?: string | number
  grindSetting?: number
  brewerId?: string | number
  note?: string
}

export interface IRecipeUpdatedEvent extends IDomainEvent<IRecipeUpdatedEventData> {}
