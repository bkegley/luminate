import {CommandType} from './CommandType'
import {ICommandHandler} from '.'

export interface ICommandRegistry {
  process<T extends ICommandHandler<any, any>>(
    commandType: CommandType,
    command: Parameters<T['handle']>[0],
  ): Promise<ReturnType<T['handle']>>
}
