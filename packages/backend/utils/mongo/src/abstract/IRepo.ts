import {Document} from 'mongoose'
// FIX: types broken on current mongoose
// @ts-ignore
import {FilterQuery, QueryOptions} from 'mongoose'

export interface IRepo<T extends Document> {
  list(filter: FilterQuery<T>, projection?: any | null, options?: QueryOptions | null): Promise<T[]>
  list(filter?: FilterQuery<T>): Promise<T[]>
  list(): Promise<T[]>

  getById(id: string): Promise<T>

  create(input: any): Promise<T>
  updateOne(conditions: any, input: any): Promise<T | null>
  updateById(id: string, input: any): Promise<T | null>
  delete(id: string): Promise<boolean>
}
