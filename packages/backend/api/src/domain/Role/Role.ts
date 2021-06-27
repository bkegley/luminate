import {AggregateRoot, EntityId} from '@luminate/ddd'
import {RoleScope} from './RoleScope'
import {RoleUpdatedEvent} from './events'

export interface RoleAggregateAttributes {
  name: string
  account?: EntityId
  // TODO: build RoleScope enum
  scopes: string[]
}

export class RoleAggregate extends AggregateRoot<RoleAggregateAttributes> {
  public get name() {
    return this.attrs.name
  }

  public get account() {
    return this.attrs.account
  }

  public get scopes() {
    return this.attrs.scopes
  }

  public update(attrs: Partial<RoleAggregateAttributes>) {
    if (attrs.account) {
      this.attrs.account = attrs.account
    }

    if (attrs.name) {
      this.attrs.name = attrs.name
    }

    if (attrs.scopes) {
      this.attrs.scopes = attrs.scopes
    }

    this.registerEvent(new RoleUpdatedEvent(this))
  }

  public static create(attrs: RoleAggregateAttributes, id?: EntityId) {
    const role = new RoleAggregate(attrs, id)
    if (!id) {
      // register a created event
    }

    return role
  }
}
