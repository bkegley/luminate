import {IEvent} from '../../IEvent'

export interface IRecipeDeletedEventData {
  id: string | number
}

export interface IRecipeDeletedEvent extends IEvent<IRecipeDeletedEventData> {}
