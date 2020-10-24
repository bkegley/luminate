import {IRepository} from './IRepository'
import {EntityId} from '../shared'
import {BrewGuide} from '../domain/BrewGuide'
import {BrewGuideName} from '../domain/BrewGuide/BrewGuideName'

export interface IBrewGuideRepository extends IRepository {
  getById(id: EntityId | string): Promise<BrewGuide>
  getByName(name: BrewGuideName | string): Promise<BrewGuide>
}
