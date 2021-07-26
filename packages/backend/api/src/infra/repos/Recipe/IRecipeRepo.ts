import {Token} from '@luminate/mongo-utils'
import {IRepo} from '../IRepo'
import {RecipeDocument} from '../../models'

export interface IRecipesRepo extends IRepo<RecipeDocument> {
  getByName: (user: Token, name: string) => Promise<RecipeDocument>
}
