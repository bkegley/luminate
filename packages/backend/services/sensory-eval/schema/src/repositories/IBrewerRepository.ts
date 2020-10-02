import {EntityId} from '../shared'
import {Brewer} from '../domain/Brewer'
import {BrewerName} from '../domain/BrewerName'
import {IRepository} from './IRepository'

export interface IBrewerRepository extends IRepository {
  getById(id: EntityId | string): Promise<Brewer>
  getByName(name: BrewerName | string): Promise<Brewer>
  save(brewer: Brewer, id?: EntityId | string): Promise<void>
  delete(id: EntityId | string): Promise<void>
}
