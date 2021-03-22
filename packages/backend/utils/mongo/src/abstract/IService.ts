import {IListDocumentsArgs} from './types'
import {IConnectionResults} from './IConnectionResults'

export interface IService<T> {
  getConnectionResults(args: IListDocumentsArgs): Promise<IConnectionResults<T>>
  create(input: any): Promise<T>
  updateOne(conditions: any, input: any): Promise<T | null>
  updateById(id: string, input: any): Promise<T | null>
  deleteById(id: string): Promise<T | null>
}
