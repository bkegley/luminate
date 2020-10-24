import {IEvent} from '../../IEvent'

export interface IRecipeUpdatedEventData {
  id: string
  name?: string
  grinderId?: string | number
  grindSetting?: number
  brewerId?: string | number
  instructions?: string[]
}

export interface IRecipeUpdatedEvent extends IEvent<IRecipeUpdatedEventData> {}
