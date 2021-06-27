import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {GetAccountQuery, ListAccountsQuery} from '../queries/Account'
import {
  CreateAccountWithOwnerCommand,
  UpdateAccountCommand,
  AddUserToAccountCommand,
  DeleteAccountCommand,
} from '../../application/commands'
import {CreateAccountInput, UpdateAccountInput} from '../../types'
import {AccountMapper} from '../../infra/mappers/AccountMapper'

@Resolver('Account')
export class AccountResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listAccounts')
  async listAccounts() {
    const query = new ListAccountsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getAccount')
  async getAccount(@Args('id') id: string) {
    const query = new GetAccountQuery(id)
    const account = await this.queryBus.execute(query)
    return AccountMapper.toDTO(account)
  }

  @Mutation('createAccount')
  async createAccount(@Args('input') input: CreateAccountInput) {
    const command = new CreateAccountWithOwnerCommand(input)
    const account = await this.commandBus.execute(command)
    console.log({account})
    return AccountMapper.toDTO(account)
  }

  @Mutation('updateAccount')
  async updateAccount(@Args('id') id: string, @Args('input') input: UpdateAccountInput) {
    const command = new UpdateAccountCommand(id, input)
    const account = await this.commandBus.execute(command)
    return AccountMapper.toDTO(account)
  }

  @Mutation('deleteAccount')
  async deleteAccount(@Args('id') id: string) {
    const command = new DeleteAccountCommand(id)
    return this.commandBus.execute(command)
  }

  @Mutation('addUserToAccount')
  async addUserToAccount(@Args('accountId') accountId: string, @Args('userId') userId: string) {
    const command = new AddUserToAccountCommand({accountId, userId})
    return this.commandBus.execute(command)
  }
}
