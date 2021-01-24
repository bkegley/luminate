import {AggregateRoot, EntityId} from '@luminate/services-shared'
import {UserPassword} from './UserPassword'
import {UserUsername} from './UserUsername'
import {UserUpdatedEvent, UserPasswordUpdatedEvent} from './events'

export interface UserAggregateAttributes {
  username: UserUsername
  accounts: EntityId[]
  defaultAccount?: EntityId
  roles: EntityId[]
  password?: UserPassword
}

export class UserAggregate extends AggregateRoot<UserAggregateAttributes> {
  public get username() {
    return this.attrs.username
  }

  public get accounts() {
    return this.attrs.accounts
  }

  public get defaultAccount() {
    return this.attrs.defaultAccount || this.attrs.accounts[0]
  }

  public get roles() {
    return this.attrs.roles
  }

  public get password() {
    return this.attrs.password.getHashedValue()
  }

  public comparePassword(plainTextPassword: string) {
    return this.attrs.password.compare(plainTextPassword)
  }

  public addAccount(account: EntityId) {
    this.attrs.accounts.push(account)
  }

  public update(attrs: Partial<UserAggregateAttributes>) {
    if (attrs.username) {
      this.attrs.username = attrs.username
    }

    this.registerEvent(new UserUpdatedEvent(this))
  }

  public updatePassword(existingPassword: string, newPlainTextPassword: string): boolean {
    if (!this.comparePassword(existingPassword)) {
      return false
    }

    this.attrs.password = UserPassword.create({value: newPlainTextPassword})
    this.registerEvent(new UserPasswordUpdatedEvent(this))
    return true
  }

  public static create(attrs: UserAggregateAttributes, id?: EntityId) {
    const user = new UserAggregate(attrs, id)

    if (!id) {
      // register created event
    }

    return user
  }
}
