import {AggregateRoot, EntityId} from '@luminate/ddd'
import {RefreshTokenCreatedEvent} from './events/RefreshTokenCreatedEvent'
import {RefreshTokenRevokedEvent} from './events/RefreshTokenRevokedEvent'
import {RefreshTokenToken} from './RefreshTokenToken'
import {RefreshTokenExpiration} from './RefreshTokenExpiration'

export interface RefreshTokenAggregateAttributes {
  userId: EntityId
  token?: RefreshTokenToken
  expiresAt?: RefreshTokenExpiration
  revokedAt?: Date
  createdAt?: Date
}

export class RefreshTokenAggregate extends AggregateRoot<RefreshTokenAggregateAttributes> {
  public get userId() {
    return this.attrs.userId
  }

  public get token() {
    return this.attrs.token
  }

  public get expiresAt() {
    return this.attrs.expiresAt
  }

  public get revokedAt() {
    return this.attrs.revokedAt
  }

  public get createdAt() {
    return this.attrs.createdAt
  }

  public get isValid() {
    return !this.attrs.revokedAt && this.attrs.expiresAt?.value >= new Date()
  }

  public revoke() {
    this.attrs.revokedAt = new Date()
    //this.registerEvent(new RefreshTokenRevokedEvent(this))
  }

  public static create(attrs: RefreshTokenAggregateAttributes, id?: EntityId) {
    const isNew = !id

    if (isNew) {
      if (!attrs.token) {
        attrs.token = RefreshTokenToken.create()
      }

      if (!attrs.createdAt) {
        attrs.createdAt = new Date()
      }

      if (!attrs.expiresAt) {
        attrs.expiresAt = RefreshTokenExpiration.create()
      }
    }

    const account = new RefreshTokenAggregate(attrs, id)

    if (isNew) {
      //account.registerEvent(new RefreshTokenCreatedEvent(account))
    }
    return account
  }
}
