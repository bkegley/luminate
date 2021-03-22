import {IAuthenticatedRepo} from '@luminate/mongo-utils'
import {FarmDocument} from '../models'

export interface IFarmsRepo extends IAuthenticatedRepo<FarmDocument> {}
