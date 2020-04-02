import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {UserModel, UserDocument} from '../models/Person'
import {AccountDocument} from '../models/Account'
import {RoleDocument} from '../models/Role'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

export class UserService extends AuthenticatedService<UserDocument> {
  constructor() {
    super(UserModel)
  }

  protected getReadConditionsForUser(): any {
    const conditions = super.getReadConditionsForUser()
    conditions.$or.push({_id: this.user?.jti} as any)
    return conditions
  }

  public findUsers(conditions: any) {
    return this.model.find(conditions)
  }

  public getMe() {
    if (!this.user?.jti) {
      return null
    }
    return this.getById(this.user.jti)
  }

  public create(input: any) {
    return super.create({...input, type: ['user']})
  }

  public updateById(id: string, input: any) {
    const {roles, ...remainingInput} = input
    const data = Object.assign(remainingInput, roles ? {$set: {[`roles.$.roles`]: roles}} : null)

    return super.updateOne({_id: id, 'roles.account': this.user?.account?.id}, data)
  }

  public deleteUserById(id: string) {
    return this.deleteById(id)
  }

  public async updatePassword(id: string, input: {currentPassword: string; newPassword: string}) {
    const user = await this.getById(id)

    if (!user || !user.password) return false

    const currentPasswordMatches = await bcrypt.compare(input.currentPassword, user.password)

    if (currentPasswordMatches) {
      // must save password this way in order to trigger pre-save hook for hashing
      user.password = input.newPassword
      user.save()
      return true
    }

    return false
  }

  private async populateUser(condition: {username?: string; _id?: string}) {
    interface PopulatedUser extends Omit<UserDocument, 'accounts' | 'roles'> {
      accounts: AccountDocument[] | undefined
      roles:
        | Array<{
            account: string
            roles: RoleDocument[] | undefined
          }>
        | undefined
    }

    return (this.model
      .findOne(condition)
      .populate({path: 'accounts'})
      .populate({
        path: 'roles.roles',
      }) as unknown) as mongoose.DocumentQuery<PopulatedUser | null, PopulatedUser, {}>
  }

  public async createLoginToken({username, password}: {username: string; password: string}) {
    const user = await this.populateUser({username})
    if (!user) return null

    const accounts = user.accounts?.map(account => ({id: account._id.toString() as string, name: account.name}))
    const accountId = user.defaultAccount ? user.defaultAccount.toString() : accounts ? accounts[0].id : undefined

    const account = accounts?.find(account => account.id === accountId)

    const {roles: userDocRoles} = user
    const accountRoles = (userDocRoles
      ?.filter(role => account && role.account.toString() === account.id)
      .map(role => role.roles)
      // @ts-ignore
      .flat() as unknown) as RoleDocument[] | undefined

    const roles = accountRoles?.map(role => ({id: role._id.toString() as string, name: role.name}))

    const scopes =
      accountRoles?.reduce((acc, role) => {
        const scopes = role.scopes
        const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []

    if (!user) return null

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) return null

    const input = {
      jti: user._id.toString() as string,
      sub: user.username,
      accounts,
      account: account
        ? {
            id: account.id,
            name: account.name,
          }
        : undefined,
      roles,
      scopes,
    }

    return jwt.sign(input, USER_AUTH_TOKEN, {expiresIn: '10m'})
  }

  public refreshToken() {
    if (!this.user) return null
    const {iat, exp, ...remainingToken} = this.user
    return jwt.sign(remainingToken, USER_AUTH_TOKEN, {expiresIn: '10m'})
  }

  public async switchAccount(accountId: string) {
    if (!this.user) return false
    const user = await this.populateUser({_id: this.user.jti})
    if (!user) return null

    const accounts = user.accounts?.map(account => ({id: account._id.toString() as string, name: account.name}))
    const account = accounts?.find(account => account.id === accountId)

    const {roles: userDocRoles} = user
    const accountRoles = (userDocRoles
      ?.filter(role => account && role.account.toString() === account.id)
      .map(role => role.roles)
      // @ts-ignore
      .flat() as unknown) as RoleDocument[] | undefined

    const roles = accountRoles?.map(role => ({id: role._id.toString() as string, name: role.name}))

    const scopes =
      accountRoles?.reduce((acc, role) => {
        const scopes = role.scopes
        const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
        return acc.concat(newScopes || [])
      }, [] as string[]) || []

    if (!user) return null

    const input = {
      jti: user._id.toString() as string,
      sub: user.username,
      accounts,
      account: account
        ? {
            id: account.id,
            name: account.name,
          }
        : undefined,
      roles,
      scopes,
    }

    return jwt.sign(input, USER_AUTH_TOKEN, {expiresIn: '10m'})
  }

  public listUsersByAccount(accountId: string) {
    return this.model.find({accounts: accountId})
  }
}
