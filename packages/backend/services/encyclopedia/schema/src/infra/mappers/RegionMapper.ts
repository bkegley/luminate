import {Region} from '../../types'
import {RegionAggregate, RegionAggregateAttributes} from '../../domain/Region/Region'
import {EntityId} from '@luminate/services-shared'

export class RegionMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    let attrs: RegionAggregateAttributes = {
      name: obj.name,
      countryId: obj.country,
    }
    const region = RegionAggregate.create(attrs, id ? EntityId.create(id) : null)
    return region
  }

  public static toPersistence(region: RegionAggregate) {
    return {
      id: region.getEntityId().toString(),
      name: region.name,
      country: region.countryId,
    }
  }

  public static toDTO(region: RegionAggregate): Region {
    return {
      id: region.getEntityId().toString(),
      name: region.name,
      // @ts-ignore
      country: region.countryId,
    }
  }
}
