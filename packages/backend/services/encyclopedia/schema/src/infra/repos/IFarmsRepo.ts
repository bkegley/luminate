import {FarmAggregate} from '../../domain/Farm/Farm'
import {IRepo} from './IRepo'

export interface IFarmsRepo extends IRepo<FarmAggregate> {}
