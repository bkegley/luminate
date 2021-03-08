import {CountryDocument} from '../models'
import {IRepo} from './IRepo'

export interface ICountriesRepo extends IRepo<CountryDocument> {}
