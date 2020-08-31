import {CommandType} from './CommandType'

export interface ICommandRegistry {
  process<T, K>(commandType: CommandType, command: T): Promise<K>
}
