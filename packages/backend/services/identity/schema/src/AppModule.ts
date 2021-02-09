import {CqrsModule} from '@nestjs/cqrs'
import {Module} from '@nestjs/common'
import {GraphQLFederationModule} from '@nestjs/graphql'

import {
  AddUserToAccountCommandHandler,
  CreateAccountWithOwnerCommandHandler,
  DeleteAccountCommandHandler,
  SwitchAccountCommandHandler,
  UpdateAccountCommandHandler,
  CreateRoleCommandHandler,
  DeleteRoleCommandHandler,
  UpdateRoleCommandHandler,
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  LoginUserCommandHandler,
  UpdateUserCommandHandler,
  UpdateUserPasswordCommandHandler,
  UpdateUserRolesCommandHandler,
} from './application/commands'
import {AccountsRepo, RolesRepo, UsersRepo} from './infra/repos'

const commandHandlers = [
  AddUserToAccountCommandHandler,
  CreateAccountWithOwnerCommandHandler,
  DeleteAccountCommandHandler,
  SwitchAccountCommandHandler,
  UpdateAccountCommandHandler,
  CreateRoleCommandHandler,
  DeleteRoleCommandHandler,
  UpdateRoleCommandHandler,
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  LoginUserCommandHandler,
  UpdateUserCommandHandler,
  UpdateUserPasswordCommandHandler,
  UpdateUserRolesCommandHandler,
]
const repos = [AccountsRepo, RolesRepo, UsersRepo]

@Module({
  imports: [CqrsModule, GraphQLFederationModule.forRoot({typePaths: ['./src/application/schema/*.graphql']})],
  providers: [...commandHandlers, ...repos],
})
export class AppModule {}
