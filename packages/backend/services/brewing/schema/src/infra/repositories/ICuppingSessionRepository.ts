import {EntityId} from '@luminate/services-shared'
import {CuppingSessionAggregate} from '../../domain/CuppingSession'
import {IRepository} from './IRepository'

export interface ICuppingSessionRepository extends IRepository {
  getById(id: EntityId | string): Promise<CuppingSessionAggregate>
  getByInternalId(id: string): Promise<CuppingSessionAggregate>
  save(brewer: CuppingSessionAggregate, id?: EntityId | string): Promise<void>
  delete(id: EntityId | string): Promise<void>
}
