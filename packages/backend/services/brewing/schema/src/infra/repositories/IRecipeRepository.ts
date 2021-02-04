import {EntityId} from '@luminate/services-shared'
import {RecipeName} from '../../domain/Recipe/RecipeName'
import {Recipe} from '../../domain/Recipe'
import {IRepository} from './IRepository'

export interface IRecipeRepository extends IRepository {
  getById(id: EntityId | string): Promise<Recipe>
  getByName(name: RecipeName | string): Promise<Recipe>
}
