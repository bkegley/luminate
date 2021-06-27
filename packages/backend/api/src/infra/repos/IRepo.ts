export interface IRepo<T> {
  list(conditions: any): Promise<T[]>
  getById(id: string): Promise<T>
  save(aggregate: any): Promise<void>
  delete(id: string): Promise<boolean>
}
