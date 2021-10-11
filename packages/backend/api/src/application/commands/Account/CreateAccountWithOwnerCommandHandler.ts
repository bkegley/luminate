import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {CreateAccountWithOwnerCommand, ICreateAccountWithOwnerCommandHandler} from '.'
import {AccountsRepo, UsersRepo, RolesRepo} from '../../../infra/repos'
import {AccountAggregate} from '../../../domain/Account/Account'
import {AccountName} from '../../../domain/Account/AccountName'
import {UserAggregate} from '../../../domain/User/User'
import {UserUsername} from '../../../domain/User/UserUsername'
import {UserPassword} from '../../../domain/User/UserPassword'
import {AccountMapper, RoleMapper, UserMapper} from '../../../infra/mappers'

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

    const [existingAccountDocument, existingUserDocument, ownerRoleDocument] = await Promise.all([
      this.accountsRepo.getByName(name),
      this.usersRepo.getByUsername(username),
      this.rolesRepo.getByName('Owner'),
    ])

    if (existingAccountDocument) {
      throw new Error('Account name taken')
    }
    if (existingUserDocument) {
      throw new Error('Username taken')
    }

    if (!ownerRoleDocument) {
      throw new Error('Owner role does not exist')
    }

    const ownerRole = RoleMapper.toDomain(ownerRoleDocument)

    const account = AccountAggregate.create({name: AccountName.create(name)})
    const user = UserAggregate.create({
      username: UserUsername.create(username),
      accounts: [account.getEntityId()],
      password: UserPassword.create({value: password}),
      roles: [{account: account.getEntityId(), roles: [ownerRole.getEntityId()]}],
    })

    try {
      await Promise.all([
        this.accountsRepo.create(AccountMapper.toPersistence(account)),
        this.usersRepo.create(UserMapper.toPersistence(user)),
      ])
    } catch (error) {
      console.log({error})
      return null
    }

    account.events.forEach(event => this.eventBus.publish(event))

    return account
  }
}
