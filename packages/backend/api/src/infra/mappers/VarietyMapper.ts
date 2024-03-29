import {VarietyAggregate, VarietyAggregateAttributes} from '../../domain/Variety/Variety'
import {EntityId} from '@luminate/ddd'
import {IVarietyDTO} from '../dtos'

export class VarietyMapper {
  public static toAttrs(obj: any) {
    const attrs: VarietyAggregateAttributes = {
      name: obj.name,
      background: obj.background,
    }

    return attrs
  }
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = VarietyMapper.toAttrs(obj)

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

  public static toDTO(variety: VarietyAggregate): IVarietyDTO {
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
