import {CountryAggregate} from '../../domain/Country/Country'
import {IRepo} from './IRepo'

export interface ICountriesRepo extends IRepo<CountryAggregate> {}
