import {IRecipeDeletedEvent, IRecipeDeletedEventData} from './IRecipeDeletedEvent'
import {EventType} from '../../EventType'
import {Recipe} from '..'

export class RecipeDeletedEvent implements IRecipeDeletedEvent {
  timestamp = new Date()
  event = EventType.RECIPE_DELETED_EVENT
  data: IRecipeDeletedEventData

  constructor(recipe: Recipe) {
    this.data = {
      id: recipe.id.toString(),
    }
  }
}
