import {CoffeeAggregate, CoffeeAggregateAttributes} from '../../domain/Coffee/Coffee'
import {EntityId} from '@luminate/services-shared'
import {CoffeeName} from '../../domain/Coffee/CoffeeName'
import {ICoffeeDTO} from '../dtos'

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
      country: coffee.countryId?.toString(),
      region: coffee.regionId?.toString(),
      varieties: coffee.varietyIds?.map(id => id.toString()),
    }
  }

  public static toDTO(coffee: CoffeeAggregate): ICoffeeDTO {
    const now = new Date()
    return {
      id: coffee.getEntityId().toString(),
      name: coffee.name.value,
      country: coffee.countryId?.toString(),
      region: coffee.regionId?.toString(),
      varieties: coffee.varietyIds?.map(id => id.toString()),
      elevation: coffee.elevation,
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
