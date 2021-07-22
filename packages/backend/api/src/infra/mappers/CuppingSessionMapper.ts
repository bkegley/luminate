import {EntityId} from '@luminate/ddd'
import {CuppingSessionAggregate, CuppingSessionAggregateAttributes} from '../../domain/CuppingSession'
import {ICuppingSessionDTO} from '../dtos'

export class CuppingSessionMapper {
  public static toAttrs(obj: any): CuppingSessionAggregateAttributes {
    return {
      internalId: obj.internalId,
      description: obj.description,
      locked: obj.locked,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    }
  }

  public static toDomain(obj: any) {
    const attrs = CuppingSessionMapper.toAttrs(obj)
    return CuppingSessionAggregate.create(attrs, obj.id ? EntityId.create(obj.id) : undefined)
  }

  public static toDTO(cuppingSession: CuppingSessionAggregate): ICuppingSessionDTO {
    const now = new Date().toISOString()
    return {
      id: cuppingSession.getEntityId().toString(),
      internalId: cuppingSession.internalId,
      description: cuppingSession.description,
      locked: cuppingSession.locked,
      //createdAt: cuppingSession.createdAt.toISOString(),
      //updatedAt: cuppingSession.updatedAt.toISOString(),
      // TODO: fix dates
      createdAt: now,
      updatedAt: now,
    }
  }

  public static toPersistence(cuppingSession: CuppingSessionAggregate): any {
    return {
      id: cuppingSession.getEntityId().toString(),
      internalId: cuppingSession.internalId,
      description: cuppingSession.description,
      locked: !!cuppingSession.locked,
    }
  }
}
