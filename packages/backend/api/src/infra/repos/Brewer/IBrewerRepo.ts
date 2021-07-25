import {Token} from '@luminate/mongo-utils'
import {IRepo} from '../IRepo'
import {BrewerDocument} from '../../models'

export interface IBrewersRepo extends IRepo<BrewerDocument> {
  getByName: (user: Token, name: string) => Promise<BrewerDocument>
}
