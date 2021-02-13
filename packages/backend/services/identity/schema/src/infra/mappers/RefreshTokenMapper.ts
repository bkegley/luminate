import {RefreshTokenAggregate, RefreshTokenAggregateAttributes} from '../../domain/refreshToken/RefreshToken'
import {EntityId} from '@luminate/services-shared'
import {RefreshTokenToken} from '../../domain/refreshToken/RefreshTokenToken'
import {RefreshTokenExpiration} from '../../domain/refreshToken/RefreshTokenExpiration'

export class RefreshTokenMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    let attrs: RefreshTokenAggregateAttributes = {
      userId: EntityId.create(obj.user),
      token: obj.token ? RefreshTokenToken.create(obj.token) : undefined,
      createdAt: obj.createdAt || undefined,
      expiresAt: obj.expiresAt ? RefreshTokenExpiration.create(obj.expiresAt) : undefined,
      revokedAt: obj.revokedAt || undefined,
    }
    const account = RefreshTokenAggregate.create(attrs, id ? EntityId.create(id) : null)
    return account
  }

  public static toPersistence(token: RefreshTokenAggregate) {
    return {
      id: token.getEntityId().toString(),
      user: token.userId.toString(),
      token: token.token.value,
      createdAt: token.createdAt,
      expiresAt: token.expiresAt.value,
      revokedAt: token.revokedAt,
    }
  }

  public static toDTO(token: RefreshTokenAggregate): string {
    return token.token.value
  }
}
