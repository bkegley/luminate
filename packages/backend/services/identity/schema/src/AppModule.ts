import {CqrsModule} from '@nestjs/cqrs'
import {Module} from '@nestjs/common'
import {GraphQLFederationModule} from '@nestjs/graphql'
import {MongooseModule} from '@nestjs/mongoose'
import {
  ListAccountsQueryHandler,
  GetAccountQueryHandler,
  ListRolesQueryHandler,
  GetRoleQueryHandler,
  ListUsersQueryHandler,
  GetUserQueryHandler,
} from './application/queries'
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
import {AccountResolvers, RoleResolvers, UserResolvers} from './application/schema'
import {AccountsRepo, RolesRepo, UsersRepo} from './infra/repos'
import {AccountModel, AccountSchema} from './infra/models'

const queryHandlers = [
  ListAccountsQueryHandler,
  GetAccountQueryHandler,
  ListRolesQueryHandler,
  GetRoleQueryHandler,
  ListUsersQueryHandler,
  GetUserQueryHandler,
]

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

const resolvers = [AccountResolvers, RoleResolvers, UserResolvers]
const repos = [AccountsRepo, RolesRepo, UsersRepo]

const mongoUrl =
  process.env.DB_URL ||
  `mongodb://localhost:27017/${process.env.NODE_ENV !== 'production' ? `${process.env.NODE_ENV}-` : ''}${process.env
    .DB_NAME || 'luminate-server'}`

@Module({
  imports: [
    CqrsModule,
    GraphQLFederationModule.forRoot({typePaths: ['./src/application/schema/*.graphql']}),
    MongooseModule.forRoot(mongoUrl),
    MongooseModule.forFeature([
      {
        name: AccountModel.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [...queryHandlers, ...commandHandlers, ...resolvers, ...repos],
})
export class AppModule {}
