import {EntityId} from '@luminate/ddd'
import {Recipe, RecipeAttributes} from '../../domain/Recipe'
import {RecipeName} from '../../domain/Recipe/RecipeName'
import {IRecipeDTO} from '../dtos'
import {RecipeNote} from '../../domain/Recipe/RecipeNote'
import {GrinderGrindSetting} from '../../domain/Recipe/GrinderGrindSetting'
import {WaterWeight} from '../../domain/Recipe/WaterWeight'
import {CoffeeWeight} from '../../domain/Recipe/CoffeeWeight'
import {Weight} from '../../domain/Weight'

export class RecipeMapper {
  public static toAttrs(obj: any): RecipeAttributes {
    return {
      name: RecipeName.create({value: obj.name}),
      brewerId: EntityId.create(obj.brewerId),
      grinderId: EntityId.create(obj.grinderId),
      // TODO: weights shouldn't be hardcoded (obviously)
      waterWeight: WaterWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      coffeeWeight: CoffeeWeight.create({value: Weight.create({amount: 10, unit: 'g'})}),
      grindSetting: obj.grindSetting ? GrinderGrindSetting.create({value: obj.grindSetting}) : null,
      note: obj.note ? RecipeNote.create({value: obj.note}) : null,
    }
  }

  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = RecipeMapper.toAttrs(obj)

    return Recipe.create(attrs, EntityId.create(id))
  }

  public static toDTO(recipe: Recipe): IRecipeDTO {
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
