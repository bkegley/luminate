import {RegionAggregate, RegionAggregateAttributes} from '../../domain/Region/Region'
import {EntityId} from '@luminate/services-shared'
import {IRegionDTO} from '../dtos'

export class RegionMapper {
  public static toAttrs(obj: any) {
    const attrs: RegionAggregateAttributes = {
      name: obj.name,
      countryId: obj.country ? EntityId.create(obj.country) : null,
    }
    return attrs
  }

  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = RegionMapper.toAttrs(obj)
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

  public static toDTO(region: RegionAggregate): IRegionDTO {
    return {
      id: region.getEntityId().toString(),
      name: region.name,
      country: region.countryId?.value ?? null,
    }
  }
}
