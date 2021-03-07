import {CountryAggregate, CountryAggregateAttributes} from '../../domain/Country/Country'
import {EntityId} from '@luminate/services-shared'
import {CountryPopulation} from '../../domain/Country/CountryPopulation'
import {CountryGeography} from '../../domain/Country/CountryGeography'
import {ICountryDTO} from '../dtos'

export class CountryMapper {
  public static toAttrs(obj: any) {
    const attrs: CountryAggregateAttributes = {
      name: obj.name,
      nameEn: obj.nameEn,
      sovereignId: obj.sovereignId,
      population: CountryPopulation.create(obj.population),
      geography: CountryGeography.create(obj.geography),
    }
    return attrs
  }

  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = CountryMapper.toAttrs(obj)

    const country = CountryAggregate.create(attrs, id ? EntityId.create(id) : null)
    return country
  }

  public static toPersistence(country: CountryAggregate) {
    return {
      id: country.getEntityId().toString(),
      name: country.name,
    }
  }

  public static toDTO(country: CountryAggregate): ICountryDTO {
    return {
      id: country.getEntityId().toString(),
      name: country.name,
      nameEn: country.nameEn,
      sovereignId: country.sovereignId,
      population: country.population
        ? {
            estimate: country.population.estimate,
            rank: country.population.rank,
            year: country.population.year,
          }
        : null,
      geography: country.geography
        ? {
            region: country.geography.region,
            subRegion: country.geography.subRegion,
            subUnit: country.geography.subUnit,
            sovereignNation: country.geography.sovereignNation,
          }
        : null,
    }
  }
}
