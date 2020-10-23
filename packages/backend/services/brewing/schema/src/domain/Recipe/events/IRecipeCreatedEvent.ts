import {IEvent} from '../../IEvent'

export interface IRecipeCreatedEventData {
  id: string
  name: string
  grinderId?: string | number
  grindSetting?: string
  brewerId?: string | number
  instructions?: string[]
}

export interface IRecipeCreatedEvent extends IEvent<IRecipeCreatedEventData> {}
