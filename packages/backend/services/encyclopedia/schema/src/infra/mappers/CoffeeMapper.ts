import {Coffee} from '../../types'
import {CoffeeAggregate, CoffeeAggregateAttributes} from '../../domain/Coffee/Coffee'
import {EntityId} from '@luminate/services-shared'
import {CoffeeName} from '../../domain/Coffee/CoffeeName'

export class CoffeeMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    let attrs: CoffeeAggregateAttributes = {
      name: CoffeeName.create(obj.name),
    }
    const coffee = CoffeeAggregate.create(attrs, id ? EntityId.create(id) : null)
    return coffee
  }

  public static toPersistence(coffee: CoffeeAggregate) {
    return {
      id: coffee.getEntityId().toString(),
      name: coffee.name.value,
    }
  }

  public static toDTO(coffee: CoffeeAggregate): Coffee {
    const now = new Date()
    // TODO: add variety
    // @ts-ignore
    return {
      id: coffee.getEntityId().toString(),
      name: coffee.name.value,
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
