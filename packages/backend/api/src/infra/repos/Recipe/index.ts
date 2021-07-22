import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {IRecipesRepo} from './IRecipeRepo'
import {RecipeDocument} from '../../models'
import {RecipeMapper} from '../../mappers/RecipeMapper'
import {Recipe} from '../../../domain/recipe'

@Injectable()
export class RecipesRepo extends AuthenticatedRepo<RecipeDocument> implements IRecipesRepo {
  constructor(@InjectModel('recipe') protected recipeModel: Model<RecipeDocument>) {
    super(recipeModel)
  }

  public async getByName(name: string) {
    return this.recipeModel.findOne({name})
  }

  save(user: Token, recipe: Recipe): Promise<void>
  save(recipe: Recipe): Promise<void>
  public async save(userOrRecipe: Token | Recipe, recipe?: Recipe) {
    if (recipe) {
      const {id, ...recipeObj} = RecipeMapper.toPersistence(recipe)
      await this.updateOne(userOrRecipe as Token, {_id: id}, recipeObj)
    } else {
      const {id, ...recipeObj} = RecipeMapper.toPersistence(userOrRecipe as Recipe)
      await this.updateOne({_id: id}, recipeObj)
    }
  }
}
