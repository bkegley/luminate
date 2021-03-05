import {Country} from '../../types'
import {CountryAggregate, CountryAggregateAttributes} from '../../domain/Country/Country'
import {EntityId} from '@luminate/services-shared'
import {CountryPopulation} from '../../domain/Country/CountryPopulation'
import {CountryGeography} from '../../domain/Country/CountryGeography'

export class CountryMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    let attrs: CountryAggregateAttributes = {
      name: obj.name,
      nameEn: obj.nameEn,
      sovereignId: obj.sovereignId,
      population: CountryPopulation.create(obj.population),
      geography: CountryGeography.create(obj.geography),
    }

    const country = CountryAggregate.create(attrs, id ? EntityId.create(id) : null)
    return country
  }

  public static toPersistence(country: CountryAggregate) {
    return {
      id: country.getEntityId().toString(),
      name: country.name,
    }
  }

  public static toDTO(country: CountryAggregate): Country {
    return {
      id: country.getEntityId().toString(),
      name: country.name,
    }
  }
}
