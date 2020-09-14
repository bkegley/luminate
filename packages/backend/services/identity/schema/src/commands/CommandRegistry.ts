import {Producer} from 'kafka-node'
import {IAccountsAggregate, IUsersAggregate, IRolesAggregate} from '../aggregates'
import {
  CommandType,
  ICommandRegistry,
  ICommandHandler,
  CreateAccountWithOwnerCommandHandler,
  UpdateAccountCommandHandler,
  DeleteAccountCommandHandler,
  AddUserToAccountCommandHandler,
  CreateUserCommandHandler,
} from '.'
import {UpdateUserCommandHandler} from './UpdateUserCommandHandler'
import {DeleteUserCommandHandler} from './DeleteUserCommandHandler'
import {UpdateUserPasswordCommandHandler} from './UpdateUserPasswordCommandHandler'
import {LoginUserCommandHandler} from './LoginUserCommandHandler'
import {LogoutUserCommandHandler} from './LogoutUserCommandHandler'
import {SwitchAccountCommandHandler} from './SwitchAccountCommandHandler'
import {CreateRoleCommandHandler} from './CreateRoleCommandHandler'
import {UpdateUserRolesCommandHandler} from './UpdateUserRolesCommandHandler'
import {UpdateRoleCommandHandler} from './UpdateRoleCommandHandler'
import {DeleteRoleCommandHandler} from './DeleteRoleCommandHandler'

export class CommandRegistry implements ICommandRegistry {
  private producer: Producer
  private accountsAggregate: IAccountsAggregate
  private usersAggregate: IUsersAggregate
  private rolesAggregate: IRolesAggregate

  private handlerRegistry: Map<CommandType, any> = new Map()

  constructor(
    producer: Producer,
    accountsAggregate: IAccountsAggregate,
    usersAggregate: IUsersAggregate,
    rolesAggregate: IRolesAggregate,
  ) {
    this.producer = producer
    this.accountsAggregate = accountsAggregate
    this.usersAggregate = usersAggregate
    this.rolesAggregate = rolesAggregate

    // register the handlers
    this.registerHandlers()
  }

  private registerHandlers() {
    // Account Commands
    this.handlerRegistry.set(
      CommandType.CREATE_ACCOUNT_COMMAND,
      new CreateAccountWithOwnerCommandHandler(
        this.producer,
        this.accountsAggregate,
        this.usersAggregate,
        this.rolesAggregate,
      ),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_ACCOUNT_COMMAND,
      new UpdateAccountCommandHandler(this.producer, this.accountsAggregate),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_ACCOUNT_COMMAND,
      new DeleteAccountCommandHandler(this.producer, this.accountsAggregate),
    )

    this.handlerRegistry.set(
      CommandType.ADD_USER_TO_ACCOUNT,
      new AddUserToAccountCommandHandler(this.producer, this.accountsAggregate, this.usersAggregate),
    )

    // User Commands
    this.handlerRegistry.set(
      CommandType.CREATE_USER_COMMAND,
      new CreateUserCommandHandler(this.producer, this.usersAggregate),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_USER_COMMAND,
      new UpdateUserCommandHandler(this.producer, this.usersAggregate),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_USER_ROLES_COMMAND,
      new UpdateUserRolesCommandHandler(this.producer, this.usersAggregate),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_USER_COMMAND,
      new DeleteUserCommandHandler(this.producer, this.usersAggregate),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_USER_PASSWORD_COMMAND,
      new UpdateUserPasswordCommandHandler(this.producer, this.usersAggregate),
    )

    this.handlerRegistry.set(
      CommandType.LOGIN_USER_COMMAND,
      new LoginUserCommandHandler(this.producer, this.usersAggregate, this.accountsAggregate, this.rolesAggregate),
    )

    this.handlerRegistry.set(
      CommandType.LOGOUT_USER_COMMAND,
      new LogoutUserCommandHandler(this.producer, this.usersAggregate),
    )

    this.handlerRegistry.set(
      CommandType.SWITCH_ACCOUNT_COMMAND,
      new SwitchAccountCommandHandler(this.producer, this.accountsAggregate, this.usersAggregate, this.rolesAggregate),
    )

    // Role Commands
    this.handlerRegistry.set(
      CommandType.CREATE_ROLE_COMMAND,
      new CreateRoleCommandHandler(this.producer, this.rolesAggregate),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_ROLE_COMMAND,
      new UpdateRoleCommandHandler(this.producer, this.rolesAggregate),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_ROLE_COMMAND,
      new DeleteRoleCommandHandler(this.producer, this.rolesAggregate),
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
