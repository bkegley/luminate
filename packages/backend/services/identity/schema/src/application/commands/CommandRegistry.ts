import {Producer} from 'kafka-node'
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
import {SwitchAccountCommandHandler} from './SwitchAccountCommandHandler'
import {CreateRoleCommandHandler} from './CreateRoleCommandHandler'
import {UpdateUserRolesCommandHandler} from './UpdateUserRolesCommandHandler'
import {UpdateRoleCommandHandler} from './UpdateRoleCommandHandler'
import {DeleteRoleCommandHandler} from './DeleteRoleCommandHandler'
import {IAccountsRepo, IRolesRepo, IUsersRepo} from '../../infra/repos'

export class CommandRegistry implements ICommandRegistry {
  private handlerRegistry: Map<CommandType, any> = new Map()

  constructor(
    private producer: Producer,
    private accountsRepo: IAccountsRepo,
    private usersRepo: IUsersRepo,
    private rolesRepo: IRolesRepo,
  ) {
    // register the handlers
    this.registerHandlers()
  }

  private registerHandlers() {
    // Account Commands
    this.handlerRegistry.set(
      CommandType.CREATE_ACCOUNT_COMMAND,
      new CreateAccountWithOwnerCommandHandler(this.producer, this.accountsRepo, this.usersRepo, this.rolesRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_ACCOUNT_COMMAND,
      new UpdateAccountCommandHandler(this.producer, this.accountsRepo),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_ACCOUNT_COMMAND,
      new DeleteAccountCommandHandler(this.producer, this.accountsRepo),
    )

    this.handlerRegistry.set(
      CommandType.ADD_USER_TO_ACCOUNT,
      new AddUserToAccountCommandHandler(this.producer, this.accountsRepo, this.usersRepo),
    )

    // User Commands
    this.handlerRegistry.set(
      CommandType.CREATE_USER_COMMAND,
      new CreateUserCommandHandler(this.producer, this.usersRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_USER_COMMAND,
      new UpdateUserCommandHandler(this.producer, this.usersRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_USER_ROLES_COMMAND,
      new UpdateUserRolesCommandHandler(this.producer, this.usersRepo),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_USER_COMMAND,
      new DeleteUserCommandHandler(this.producer, this.usersRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_USER_PASSWORD_COMMAND,
      new UpdateUserPasswordCommandHandler(this.producer, this.usersRepo),
    )

    this.handlerRegistry.set(
      CommandType.LOGIN_USER_COMMAND,
      new LoginUserCommandHandler(this.producer, this.usersRepo, this.accountsRepo, this.rolesRepo),
    )

    this.handlerRegistry.set(
      CommandType.SWITCH_ACCOUNT_COMMAND,
      new SwitchAccountCommandHandler(this.producer, this.accountsRepo, this.usersRepo, this.rolesRepo),
    )

    // Role Commands
    this.handlerRegistry.set(
      CommandType.CREATE_ROLE_COMMAND,
      new CreateRoleCommandHandler(this.producer, this.rolesRepo),
    )

    this.handlerRegistry.set(
      CommandType.UPDATE_ROLE_COMMAND,
      new UpdateRoleCommandHandler(this.producer, this.rolesRepo),
    )

    this.handlerRegistry.set(
      CommandType.DELETE_ROLE_COMMAND,
      new DeleteRoleCommandHandler(this.producer, this.rolesRepo),
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
