import {Document} from 'mongoose'
// FIX: types broken on current mongoose
// @ts-ignore
import {FilterQuery, QueryOptions} from 'mongoose'
import {IListDocumentsArgs, IRepo, Token} from '.'

export interface IAuthenticatedRepo<T extends Document> extends IRepo<T> {
  list(filter: FilterQuery<T>, projection?: any | null, options?: QueryOptions | null): Promise<T[]>
  list(filter: FilterQuery<T>): Promise<T[]>
  list(user: Token): Promise<T[]>
  list(user: Token, filter: FilterQuery<T>, projection?: any | null, options?: QueryOptions | null): Promise<T[]>
  list(user: Token, filter: FilterQuery<T>): Promise<T[]>
  list(): Promise<T[]>

  getById(id: string): Promise<T>
  getById(user: Token, id: string): Promise<T>

  getConnectionResults(args: IListDocumentsArgs): Promise<T>
  getConnectionResults(user: Token, args?: IListDocumentsArgs): Promise<T>

  create(input: any): Promise<T>
  create(user: Token, input: any): Promise<T>

  updateOne(conditions: any, input: any): Promise<T | null>
  updateOne(user: Token, conditions: any, input: any): Promise<T | null>

  updateById(id: string, input: any): Promise<T | null>
  updateById(user: Token, id: string, input: any): Promise<T | null>

  delete(id: string): Promise<void>
  delete(user: Token, id: string): Promise<void>
}
