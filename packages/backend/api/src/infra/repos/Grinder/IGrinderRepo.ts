import {Token} from '@luminate/mongo-utils'
import {IRepo} from '../IRepo'
import {GrinderDocument} from '../../models'

export interface IGrindersRepo extends IRepo<GrinderDocument> {
  getByName: (user: Token, name: string) => Promise<GrinderDocument>
}
