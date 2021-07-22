import {IDomainEvent} from '../../DomainEvent'

export interface IRecipeDeletedEventData {
  id: string | number
}

export interface IRecipeDeletedEvent extends IDomainEvent<IRecipeDeletedEventData> {}
