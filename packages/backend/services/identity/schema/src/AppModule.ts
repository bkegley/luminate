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
  GetMeQueryHandler,
  GetUserQueryHandler,
} from './application/queries'
import {
  AddUserToAccountCommandHandler,
  CreateAccountWithOwnerCommandHandler,
  DeleteAccountCommandHandler,
  SwitchAccountCommandHandler,
  UpdateAccountCommandHandler,
  CreateOwnerRoleCommandHandler,
  CreateRoleCommandHandler,
  DeleteRoleCommandHandler,
  UpdateRoleCommandHandler,
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshTokenComandHandler,
  UpdateUserCommandHandler,
  UpdateUserPasswordCommandHandler,
  UpdateUserRolesCommandHandler,
} from './application/commands'
import {AccountResolvers, AuthResolvers, RoleResolvers, UserResolvers} from './application/schema'
import {AccountsRepo, RefreshTokensRepo, RolesRepo, UsersRepo} from './infra/repos'
import {AccountSchema, RoleSchema, UserSchema, RefreshTokenSchema} from './infra/models'
import {TokenService} from './infra/services/TokenService'
import {AuthGuard} from './application/guards'

const queryHandlers = [
  ListAccountsQueryHandler,
  GetAccountQueryHandler,
  ListRolesQueryHandler,
  GetRoleQueryHandler,
  ListUsersQueryHandler,
  GetMeQueryHandler,
  GetUserQueryHandler,
]

const commandHandlers = [
  AddUserToAccountCommandHandler,
  CreateAccountWithOwnerCommandHandler,
  DeleteAccountCommandHandler,
  SwitchAccountCommandHandler,
  UpdateAccountCommandHandler,
  CreateOwnerRoleCommandHandler,
  CreateRoleCommandHandler,
  DeleteRoleCommandHandler,
  UpdateRoleCommandHandler,
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshTokenComandHandler,
  UpdateUserCommandHandler,
  UpdateUserPasswordCommandHandler,
  UpdateUserRolesCommandHandler,
]

const resolvers = [AccountResolvers, AuthResolvers, RoleResolvers, UserResolvers]
const repos = [AccountsRepo, RefreshTokensRepo, RolesRepo, UsersRepo]
const services = [TokenService]
const guards = [AuthGuard]

const mongoUrl = process.env.DB_URL || `mongodb://localhost:27017/luminate-identity`

@Module({
  imports: [
    CqrsModule,
    GraphQLFederationModule.forRoot({
      typePaths: ['./src/application/schema/*.graphql'],
      context: ({req, res}) => {
        return {
          headers: req.headers,
          req,
          res,
        }
      },
    }),
    MongooseModule.forRoot(mongoUrl, {useFindAndModify: false}),
    MongooseModule.forFeature([
      {
        name: 'account',
        schema: AccountSchema,
      },
      {
        name: 'refreshToken',
        schema: RefreshTokenSchema,
      },
      {
        name: 'role',
        schema: RoleSchema,
      },
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [...queryHandlers, ...commandHandlers, ...resolvers, ...repos, ...services, ...guards],
})
export class AppModule {}
