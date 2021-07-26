import {Token} from '@luminate/mongo-utils'
import {IRepo} from '../IRepo'
import {BrewGuideDocument} from '../../models'

export interface IBrewGuidesRepo extends IRepo<BrewGuideDocument> {
  getByName(user: Token, name: string): Promise<BrewGuideDocument>
}
