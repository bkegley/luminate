import {Brewer} from '../../../domain/Brewer'
import {Grinder} from '../../../domain/Grinder'
import {Recipe} from '../../../domain/Recipe'

export interface CreateRecipeDTO {
  recipe: Recipe
  brewer: Brewer
  grinder: Grinder
}
