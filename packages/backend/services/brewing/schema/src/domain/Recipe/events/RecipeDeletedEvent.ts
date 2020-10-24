import {IRecipeDeletedEvent} from './IRecipeDeletedEvent'
import {EventType} from '../../EventType'
import {Recipe} from '..'

export class RecipeDeletedEvent implements IRecipeDeletedEvent {
  timestamp = new Date()
  event = EventType.RECIPE_DELETED_EVENT
  data: any

  constructor(recipe: Recipe) {
    this.data = {
      id: recipe.id.toString(),
    }
  }
}
