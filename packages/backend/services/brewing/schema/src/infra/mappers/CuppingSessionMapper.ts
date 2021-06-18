import {EntityId} from '@luminate/services-shared'
import {CuppingSessionAggregate, CuppingSessionAggregateAttributes} from '../../domain/CuppingSession'
import {CuppingSessionDTO} from '../dtos'

export class CuppingSessionMapper {
  public static toDomain(obj: any) {
    const attrs: CuppingSessionAggregateAttributes = {
      internalId: obj.internalId,
      description: obj.description,
      locked: obj.locked,
      sessionCoffees: obj.sessionCoffees,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    }

    return CuppingSessionAggregate.create(attrs, obj.id ? EntityId.create(obj.id) : undefined)
  }

  public static toDTO(cuppingSession: CuppingSessionAggregate): CuppingSessionDTO {
    const now = new Date().toISOString()
    return {
      id: cuppingSession.getEntityId().toString(),
      internalId: cuppingSession.internalId,
      description: cuppingSession.description,
      locked: cuppingSession.locked,
      sessionCoffees: cuppingSession.sessionCoffees?.map(sessionCoffee => ({
        id: sessionCoffee.id.toString(),
        coffee: sessionCoffee.coffeeId,
        sampleNumber: sessionCoffee.sampleNumber,
      })),
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
      sessionCoffees: cuppingSession.sessionCoffees,
      locked: !!cuppingSession.locked,
    }
  }
}
