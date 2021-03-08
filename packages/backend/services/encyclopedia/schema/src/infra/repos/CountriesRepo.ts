import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {ICountriesRepo} from './ICountriesRepo'
import {CountryDocument} from '../models'
import {CountryMapper} from '../mappers'
import {CountryAggregate} from '../../domain/Country/Country'
import {BaseRepo} from '@luminate/mongo-utils'

@Injectable()
export class CountriesRepo extends BaseRepo<CountryDocument> implements ICountriesRepo {
  constructor(@InjectModel('country') private countryModel: Model<CountryDocument>) {
    super(countryModel)
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
}
