import {ICommandRegistry} from './ICommandRegistry'
import {ICommandHandler} from './ICommandHandler'
import {CommandType} from './CommandType'
import {Producer} from 'kafka-node'
import {CreateAccountWithOwnerCommandHandler} from './CreateAccountWithOwnerCommandHandler'
import {IAccountsAggregate, IUsersAggregate} from '../aggregates'

export class CommandRegistry implements ICommandRegistry {
  private producer: Producer
  private accountsAggregate: IAccountsAggregate
  private usersAggregate: IUsersAggregate
  private handlerRegistry: Map<CommandType, any> = new Map()

  constructor(producer: Producer, accountsAggregate: IAccountsAggregate, usersAggregate: IUsersAggregate) {
    this.producer = producer
    this.accountsAggregate = accountsAggregate
    this.usersAggregate = usersAggregate
    this.registerHandlers()
  }

  private registerHandlers() {
    this.handlerRegistry.set(
      CommandType.CREATE_ACCOUNT_COMMAND,
      new CreateAccountWithOwnerCommandHandler(this.producer, this.accountsAggregate, this.usersAggregate),
    )
  }

  public async process<T, K>(commandType: CommandType, command: T) {
    const commandHandler = this.handlerRegistry.get(commandType) as ICommandHandler<T, K>
    if (!commandHandler) {
      throw new Error(`${commandType} has no registered handler`)
    }

    return commandHandler.handle(command)
  }
}
