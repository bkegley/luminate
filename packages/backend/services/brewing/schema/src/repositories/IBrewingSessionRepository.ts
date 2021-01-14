import {IRepository} from './IRepository'
import {BrewingSession} from '../domain/BrewingSession'
import {EntityId} from '@luminate/services-shared'

export interface IBrewingSessionRepository extends IRepository {
  getById(id: EntityId | string): Promise<BrewingSession>
}
