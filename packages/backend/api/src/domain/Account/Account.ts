import {AggregateRoot, EntityId} from '@luminate/ddd'
import {AccountName} from './AccountName'
import {AccountCreatedEvent} from './events/AccountCreatedEvent'
import {AccountUpdatedEvent} from './events'

export interface AccountAggregateAttributes {
  name: AccountName
}

export class AccountAggregate extends AggregateRoot<AccountAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public update(attrs: AccountAggregateAttributes) {
    if (attrs.name) {
      this.attrs.name = attrs.name
    }

    this.registerEvent(new AccountUpdatedEvent(this))
  }

  public static create(attrs: AccountAggregateAttributes, id?: EntityId) {
    const account = new AccountAggregate(attrs, id)

    if (!id) {
      account.registerEvent(new AccountCreatedEvent(account))
    }
    return account
  }
}
