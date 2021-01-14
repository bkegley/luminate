import {EntityId} from '@luminate/services-shared'
import {Recipe} from '../domain/Recipe'
import {RecipeName} from '../domain/Recipe/RecipeName'
import {RecipeDTO} from '../dtos'
import {RecipeNote} from '../domain/Recipe/RecipeNote'
import {GrinderGrindSetting} from '../domain/Recipe/GrinderGrindSetting'
import {WaterWeight} from '../domain/Recipe/WaterWeight'
import {CoffeeWeight} from '../domain/Recipe/CoffeeWeight'
import {Weight} from '../domain/Weight'

export class RecipeMapper {
  public static toDomain(recipeDTO: RecipeDTO) {
    return Recipe.create(
      {
        name: RecipeName.create({value: recipeDTO.name}),
        brewerId: EntityId.create(recipeDTO.brewerId),
        grinderId: EntityId.create(recipeDTO.grinderId),
        waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
        coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
        grindSetting: recipeDTO.grindSetting ? GrinderGrindSetting.create({value: recipeDTO.grindSetting}) : null,
        note: recipeDTO.note ? RecipeNote.create({value: recipeDTO.note}) : null,
      },
      //TODO: I'm not sure if this should check for provided id
      EntityId.create(recipeDTO.id),
    )
  }

  public static toDTO(recipe: Recipe): RecipeDTO {
    return {
      id: recipe.id.toString(),
      name: recipe.name.value,
      grinderId: recipe.grinderId.toString(),
      brewerId: recipe.brewerId.toString(),
      grindSetting: recipe.grindSetting?.value,
      note: recipe.note?.value,
    }
  }

  public static toPersistence(recipe: Recipe): any {
    return {
      id: recipe.id.toString(),
      name: recipe.name.value,
      grinderId: recipe.grinderId.toString(),
      brewerId: recipe.brewerId.toString(),
      grindSetting: recipe.grindSetting?.value,
      note: recipe.note?.value,
    }
  }
}
