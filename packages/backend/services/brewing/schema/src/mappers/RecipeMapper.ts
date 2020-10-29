import {EntityId} from '../shared'
import {Recipe} from '../domain/Recipe'
import {RecipeName} from '../domain/Recipe/RecipeName'
import {RecipeDTO} from '../dtos'
import {BrewerId} from '../domain/Brewer/BrewerId'
import {GrinderId} from '../domain/Grinder/GrinderId'
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
        brewerId: BrewerId.create(EntityId.create(recipeDTO.brewerId)),
        grinderId: GrinderId.create(EntityId.create(recipeDTO.grinderId)),
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
      grinderId: recipe.grinderId.value,
      brewerId: recipe.brewerId.value,
      grindSetting: recipe.grindSetting?.value,
      note: recipe.note?.value,
    }
  }

  public static toPersistence(recipe: Recipe): any {
    return {
      id: recipe.id.toString(),
      name: recipe.name.value,
      grinderId: recipe.grinderId.value,
      brewerId: recipe.brewerId.value,
      grindSetting: recipe.grindSetting?.value,
      note: recipe.note?.value,
    }
  }
}
