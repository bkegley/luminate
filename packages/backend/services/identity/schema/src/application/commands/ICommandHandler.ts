export interface ICommandHandler<T, K> {
  handle(command: T): Promise<K>
}
