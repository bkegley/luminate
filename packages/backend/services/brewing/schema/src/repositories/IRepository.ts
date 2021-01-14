import {EntityId} from '@luminate/services-shared'

export interface IRepository {
  save(obj: any, id?: EntityId | string): Promise<void>
  delete(id: EntityId | string): Promise<void>
}
