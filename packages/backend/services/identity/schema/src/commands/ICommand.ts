export interface ICommand<T> {
  execute(data: T): Promise<boolean>
}
