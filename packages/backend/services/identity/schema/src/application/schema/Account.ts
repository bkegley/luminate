import {gql} from 'apollo-server-express'
import {Resolvers} from '../../types'
import {TYPES} from '../../utils/types'
import {
  CreateAccountWithOwnerCommand,
  ICommandRegistry,
  CommandType,
  UpdateAccountCommand,
  DeleteAccountCommand,
  AddUserToAccountCommand,
} from '../../application/commands'
import {AccountDocument, UserDocument} from '../../infra/models'
import {IAccountsProjection} from '../../infra/projections'
import {IUsersRepo} from '../../infra/repos'
import {AccountAggregate} from '../../domain/account/Account'
import {AccountMapper} from '../../infra/mappers/AccountMapper'
import {UserMapper} from '../../infra/mappers/UserMapper'

const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    users: [User!]
    createdAt: String!
    updatedAt: String!
  }

  type AccountConnection {
    pageInfo: PageInfo!
    edges: [AccountEdge!]!
  }

  type AccountEdge {
    cursor: String!
    node: Account!
  }

  input CreateAccountInput {
    name: String!
    username: String!
    password: String!
  }

  input UpdateAccountInput {
    name: String
  }

  extend type Query {
    listAccounts(cursor: String, limit: Int, query: [QueryInput!]): AccountConnection!
    getAccount(id: ID!): Account
  }

  extend type Mutation {
    createAccount(input: CreateAccountInput!): Account
    updateAccount(id: ID!, input: UpdateAccountInput!): Account
    deleteAccount(id: ID!): Account
    addUserToAccount(accountId: ID!, userId: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listAccounts: async (parent, args, {container}) => {
      const accountsProjection = container.resolve<IAccountsProjection>(TYPES.AccountsProjection)
      // TODO: not sure why this isn't matching the listAccounts return type
      return accountsProjection.getConnectionResults(args) as ReturnType<Resolvers['QueryResolvers']['listAccounts']>
    },
    getAccount: async (parent, {id}, {container}, info) => {
      const accountsProjection = container.resolve<IAccountsProjection>(TYPES.AccountsProjection)
      return accountsProjection.getAccount(id)
    },
  },
  Mutation: {
    // @ts-ignore
    createAccount: async (parent, {input}, {container}) => {
      const command = new CreateAccountWithOwnerCommand(input)
      const account = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<CreateAccountWithOwnerCommand, AccountAggregate>(CommandType.CREATE_ACCOUNT_COMMAND, command)

      console.log({account})

      return AccountMapper.toDTO(account)
    },
    updateAccount: async (parent, {id, input}, {container}) => {
      const command = new UpdateAccountCommand(id, input)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateAccountCommand, AccountDocument>(CommandType.UPDATE_ACCOUNT_COMMAND, command)
    },
    deleteAccount: async (parent, {id}, {container}) => {
      const command = new DeleteAccountCommand(id)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<DeleteAccountCommand, AccountDocument>(CommandType.DELETE_ACCOUNT_COMMAND, command)
    },
    addUserToAccount: async (parent, {accountId, userId}, {container}) => {
      const command = new AddUserToAccountCommand({accountId, userId})
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<AddUserToAccountCommand, boolean>(CommandType.ADD_USER_TO_ACCOUNT, command)
    },
  },
  Account: {
    // @ts-ignore
    users: async (parent, args, {container}) => {
      const users = await container.resolve<IUsersRepo>(TYPES.UsersRepo).list({account: parent.id})
      return users.map(user => UserMapper.toDTO(user))
    },
  },
}

export const schema = {typeDefs, resolvers}
