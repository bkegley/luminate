import {Coffee} from '../../types'
import {CoffeeAggregate, CoffeeAggregateAttributes} from '../../domain/Coffee/Coffee'
import {EntityId} from '@luminate/services-shared'
import {CoffeeName} from '../../domain/Coffee/CoffeeName'

export class CoffeeMapper {
  // TODO: should validate input
  public static toAttrs(obj: any) {
    const attrs: CoffeeAggregateAttributes = {
      name: CoffeeName.create(obj.name),
      countryId: obj.country ? EntityId.create(obj.country) : null,
      regionId: obj.region ? EntityId.create(obj.region) : null,
      varietyIds: obj.varieties ? obj.varieties.map(EntityId.create) : null,
    }

    return attrs
  }

  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = CoffeeMapper.toAttrs(obj)

    const coffee = CoffeeAggregate.create(attrs, id ? EntityId.create(id) : null)
    return coffee
  }

  public static toPersistence(coffee: CoffeeAggregate) {
    return {
      id: coffee.getEntityId().toString(),
      name: coffee.name.value,
      country: coffee.countryId.toString(),
      region: coffee.regionId.toString(),
      varieties: coffee.varietyIds.map(id => id.toString()),
    }
  }

  // TODO: DTOs should not be equivalent to GraphQL return types
  // Instead, they should return ids so that field resolvers can
  // pick them up and resolve the entity
  public static toDTO(coffee: CoffeeAggregate): Coffee {
    const now = new Date()
    // @ts-ignore
    return {
      id: coffee.getEntityId().toString(),
      name: coffee.name.value,
      // @ts-ignore
      country: coffee.countryId?.toString(),
      // @ts-ignore
      region: coffee.regionId?.toString(),
      // @ts-ignore
      varieties: coffee.varietyIds?.map(id => id.toString()),
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
