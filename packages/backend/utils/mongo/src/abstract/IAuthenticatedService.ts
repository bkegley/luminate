import {IListDocumentsArgs, Token} from './types'
import {IConnectionResults} from './IConnectionResults'

export interface IAuthenticatedService<T> {
  getConnectionResults(user: Token, args: IListDocumentsArgs): Promise<IConnectionResults<T>>
  create(user: Token, input: any): Promise<T>
  updateOne(user: Token, conditions: any, input: any): Promise<T | null>
  updateById(user: Token, id: string, input: any): Promise<T | null>
  deleteById(user: Token, id: string): Promise<T | null>
}
