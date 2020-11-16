import {IRepository} from './IRepository'
import {Evaluation} from '../domain/Evaluation'
import {EntityId} from '../shared'

export interface IEvaluationRepository extends IRepository {
  getById(id: EntityId | string): Promise<Evaluation>
}
