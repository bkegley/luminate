import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {CreateAccountWithOwnerCommand, ICreateAccountWithOwnerCommandHandler} from '.'
import {AccountsRepo, UsersRepo, RolesRepo} from '../../../infra/repos'
import {AccountAggregate} from '../../../domain/account/Account'
import {AccountName} from '../../../domain/account/AccountName'
import {UserAggregate} from '../../../domain/user/User'
import {UserUsername} from '../../../domain/user/UserUsername'
import {UserPassword} from '../../../domain/user/UserPassword'

@CommandHandler(CreateAccountWithOwnerCommand)
export class CreateAccountWithOwnerCommandHandler implements ICreateAccountWithOwnerCommandHandler {
  constructor(
    private eventBus: EventBus,
    private accountsRepo: AccountsRepo,
    private usersRepo: UsersRepo,
    private rolesRepo: RolesRepo,
  ) {}

  public async execute(command: CreateAccountWithOwnerCommand) {
    const {name, username, password} = command

    const [existingAccount, existingUser, ownerRole] = await Promise.all([
      this.accountsRepo.getByName(name),
      this.usersRepo.getByUsername(username),
      this.rolesRepo.getByName('Owner'),
    ])

    if (existingAccount) {
      throw new Error('Account name taken')
    }
    if (existingUser) {
      throw new Error('Username taken')
    }

    if (!ownerRole) {
      throw new Error('Owner role does not exist')
    }

    const account = AccountAggregate.create({name: AccountName.create(name)})
    const user = UserAggregate.create({
      username: UserUsername.create(username),
      accounts: [account.getEntityId()],
      password: UserPassword.create({value: password}),
      roles: [ownerRole.getEntityId()],
    })

    try {
      await Promise.all([this.accountsRepo.save(account), this.usersRepo.save(user)])
    } catch (error) {
      console.log({error})
      return null
    }

    account.events.forEach(event => this.eventBus.publish(event))

    return account
  }
}
