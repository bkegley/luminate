import {Document, QueryFindOneAndUpdateOptions} from 'mongoose'
import {Model} from 'mongoose'

export interface IRepo<T extends Document> {
  list(): Promise<T[]>
  list(args: Parameters<typeof Model.find>): Promise<T[]>
  create(input: any): Promise<T>
  updateOne(conditions: any, input: any, options?: QueryFindOneAndUpdateOptions): Promise<T | null>
  updateById(id: string, input: any, options?: QueryFindOneAndUpdateOptions): Promise<T | null>
  delete(id: string): Promise<void>
}
