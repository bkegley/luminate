export interface IRepo<T> {
  list(conditions: any): Promise<T>
  getById(id: string): Promise<T>
}
