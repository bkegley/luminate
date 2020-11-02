import {IEvent} from '../../IEvent'

export interface IBrewGuideUpdatedEventData {
  id: string
  name?: string
  recipeId?: string
}

export interface IBrewGuideUpdatedEvent extends IEvent<IBrewGuideUpdatedEventData> {}
