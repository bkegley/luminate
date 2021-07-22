import {Brewer} from '../../../../domain/Brewer'
import {Grinder} from '../../../../domain/Grinder'
import {Recipe} from '../../../../domain/Recipe'

export interface UpdateRecipeDTO {
  recipe: Recipe
  brewer: Brewer
  grinder: Grinder
}
