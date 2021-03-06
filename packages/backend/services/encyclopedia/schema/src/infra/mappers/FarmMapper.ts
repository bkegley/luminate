import {Farm} from '../../types'
import {FarmAggregate, FarmAggregateAttributes} from '../../domain/Farm/Farm'
import {EntityId} from '@luminate/services-shared'

export class FarmMapper {
  public static toAttrs(obj: any) {
    const attrs: FarmAggregateAttributes = {
      name: obj.name,
      regionId: obj.region ? EntityId.create(obj.region) : null,
      countryId: obj.countryId ? EntityId.create(obj.country) : null,
    }

    return attrs
  }
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = FarmMapper.toAttrs(obj)
    const farm = FarmAggregate.create(attrs, id ? EntityId.create(id) : null)
    return farm
  }

  public static toPersistence(farm: FarmAggregate) {
    return {
      id: farm.getEntityId().toString(),
      name: farm.name,
    }
  }

  public static toDTO(farm: FarmAggregate): Farm {
    const now = new Date()
    // TODO: add farmZones
    // @ts-ignore
    return {
      id: farm.getEntityId().toString(),
      name: farm.name,
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
