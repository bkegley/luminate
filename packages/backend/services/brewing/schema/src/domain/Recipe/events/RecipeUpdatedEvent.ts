import {IRecipeUpdatedEvent, IRecipeUpdatedEventData} from './IRecipeUpdatedEvent'
import {EventType} from '../../EventType'
import {Recipe} from '..'

export class RecipeUpdatedEvent implements IRecipeUpdatedEvent {
  timestamp = new Date()
  event = EventType.RECIPE_UPDATED_EVENT
  data: IRecipeUpdatedEventData

  constructor(recipe: Recipe) {
    const updatedFields = Object.fromEntries([...recipe.markedFields])
    this.data = {
      id: recipe.id.toString(),
      ...updatedFields,
    }
  }
}
