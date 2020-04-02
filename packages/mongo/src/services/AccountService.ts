import {AccountModel, AccountDocument} from '../models/Account'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import {RoleModel} from '../models/Role'
import {UserModel} from '../models/Person'

export class AccountService extends AuthenticatedService<AccountDocument> {
  constructor() {
    super(AccountModel)
  }

  protected getReadConditionsForUser(): any {
    const conditions = super.getReadConditionsForUser()
    conditions.$or.push({_id: this.user?.account?.id} as any)
    return conditions
  }

  public findAccounts(conditions?: any) {
    return this.model.find(conditions)
  }

  public listUserAccounts() {
    return this.user?.accounts
  }

  public getCurrentAccount() {
    if (!this.user?.account) return null
    return this.getById(this.user.account.id)
  }

  public async create(input: any) {
    const {name, username, password} = input
    const ownerRole = await RoleModel.findOne({name: 'Owner'})

    if (!ownerRole) {
      throw new Error('Owner role does not exist')
    }

    const account = new this.model({name})
    const user = new UserModel({
      username,
      password,
      roles: [
        {
          account: account._id,
          roles: [ownerRole?._id].filter(Boolean),
        },
      ],
      accounts: [account._id],
      readAccess: [account._id],
      writeAccess: [account._id],
      adminAccess: [account._id],
      type: ['user'],
    })

    account.save()
    user.save()

    return account
  }

  public async addUserToAccount(accountId: string, userId: string) {
    const updatedUser = await UserModel.findOneAndUpdate(
      {_id: userId, 'roles.account': {$ne: accountId}},
      {
        $addToSet: {accounts: accountId},
        $push: {
          roles: {account: accountId, roles: []},
        },
      },
      {new: true},
    )
    return !!updatedUser
  }
}
