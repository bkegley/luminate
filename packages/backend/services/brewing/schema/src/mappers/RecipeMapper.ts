import {EntityId} from '../shared'
import {Recipe} from '../domain/Recipe'
import {RecipeName} from '../domain/Recipe/RecipeName'
import {RecipeDTO} from '../dtos'
import {BrewerId} from '../domain/Brewer/BrewerId'
import {GrinderId} from '../domain/Grinder/GrinderId'
import {RecipeInstructions} from '../domain/Recipe/RecipeInstructions'
import {GrinderGrindSetting} from '../domain/Recipe/GrinderGrindSetting'

export class RecipeMapper {
  public static toDomain(recipeDTO: RecipeDTO) {
    return Recipe.create(
      {
        name: RecipeName.create({value: recipeDTO.name}),
        brewerId: BrewerId.create(EntityId.create(recipeDTO.brewerId)),
        grinderId: GrinderId.create(EntityId.create(recipeDTO.grinderId)),
        grindSetting: recipeDTO.grindSetting ? GrinderGrindSetting.create({value: recipeDTO.grindSetting}) : null,
        instructions: recipeDTO.instructions ? RecipeInstructions.create({value: recipeDTO.instructions}) : null,
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
      instructions: recipe.instructions?.value,
    }
  }

  public static toPersistence(recipe: Recipe): any {
    return {
      id: recipe.id.toString(),
      name: recipe.name.value,
      grinderId: recipe.grinderId.value,
      brewerId: recipe.brewerId.value,
      grindSetting: recipe.grindSetting?.value,
      instructions: recipe.instructions?.value,
    }
  }
}
