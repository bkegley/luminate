import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {ICountriesRepo} from './ICountriesRepo'
import {CountryDocument} from '../models'
import {CountryMapper} from '../mappers'
import {CountryAggregate} from '../../domain/Country/Country'

@Injectable()
export class CountriesRepo implements ICountriesRepo {
  constructor(@InjectModel('country') private countryModel: Model<CountryDocument>) {}

  public async list(conditions?: any) {
    const countries = await this.countryModel.find(conditions)
    if (!countries) {
      return null
    }

    return countries.map(country => CountryMapper.toDomain(country))
  }

  public async getById(id: string) {
    const country = await this.countryModel.findById(id)
    if (!country) {
      return null
    }

    return CountryMapper.toDomain(country)
  }

  public async getByName(name: string) {
    const country = await this.countryModel.findOne({name})
    if (!country) {
      return null
    }

    return CountryMapper.toDomain(country)
  }

  public async save(country: CountryAggregate) {
    const {id, ...countryObj} = CountryMapper.toPersistence(country)
    await this.countryModel.updateOne({_id: id}, countryObj, {upsert: true})
  }

  public async delete(id: string) {
    await this.countryModel.deleteOne({_id: id})
  }
}
