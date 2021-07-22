import {IRecipeCreatedEvent, IRecipeCreatedEventData} from './IRecipeCreatedEvent'
import {EventType} from '../../EventType'
import {Recipe} from '..'

export class RecipeCreatedEvent implements IRecipeCreatedEvent {
  timestamp = new Date()
  event = EventType.RECIPE_CREATED_EVENT
  data: IRecipeCreatedEventData

  constructor(recipe: Recipe) {
    const createdFields = Object.fromEntries([...recipe.markedFields])
    this.data = {
      id: recipe.id.toString(),
      name: recipe.name.value,
      ...createdFields,
    }
  }
}
