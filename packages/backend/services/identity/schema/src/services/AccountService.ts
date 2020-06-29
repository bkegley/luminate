import {AccountDocument, AccountModel, RoleModel, UserModel} from '../models'
import {AuthenticatedService, Token} from '@luminate/mongo-utils'
import DataLoader from 'dataloader'

interface Loaders {
  byAccountId?: DataLoader<string, AccountDocument | null>
}

export class AccountService extends AuthenticatedService<AccountDocument> {
  constructor(user: Token | null) {
    super(AccountModel, user)

    this.loaders.byAccountId = new DataLoader<string, AccountDocument | null>(async ids => {
      const accounts = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => accounts.find(account => account._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  protected getReadConditionsForUser(): any {
    const conditions = super.getReadConditionsForUser()
    conditions.$or.push({_id: {$in: this.user?.accounts?.map(account => account.id) || []}} as any)
    return conditions
  }

  public async getById(id: string) {
    return this.loaders.byAccountId?.load(id) || null
  }

  public findAccounts(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }

  public async listUserAccounts() {
    if (!this.user?.accounts) return []
    return (
      await Promise.all(this.user.accounts.map(account => this.loaders.byAccountId?.load(account.id) || null))
    ).filter(Boolean) as AccountDocument[]
  }

  public getCurrentAccount() {
    if (!this.user?.account) return null
    return this.loaders.byAccountId?.load(this.user.account.id) || null
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
