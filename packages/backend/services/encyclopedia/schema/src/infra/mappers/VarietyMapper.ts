import {Variety} from '../../types'
import {VarietyAggregate, VarietyAggregateAttributes} from '../../domain/Variety/Variety'
import {EntityId} from '@luminate/services-shared'

export class VarietyMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id

    let attrs: VarietyAggregateAttributes = {
      name: obj.name,
      background: obj.background,
    }

    const variety = VarietyAggregate.create(attrs, id ? EntityId.create(id) : null)
    return variety
  }

  public static toPersistence(variety: VarietyAggregate) {
    return {
      id: variety.getEntityId().toString(),
      name: variety.name,
      background: variety.background,
    }
  }

  public static toDTO(variety: VarietyAggregate): Variety {
    const now = new Date()
    return {
      id: variety.getEntityId().toString(),
      name: variety.name,
      background: variety.background,
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
