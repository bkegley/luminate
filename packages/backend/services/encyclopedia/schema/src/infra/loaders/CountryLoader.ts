import {Injectable, Scope} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import DataLoader from 'dataloader'
import {Model} from 'mongoose'
import {CountryAggregate} from '../../domain/Country/Country'
import {CountryMapper} from '../mappers'
import {CountryDocument} from '../models'

@Injectable({scope: Scope.REQUEST})
export class CountryLoader {
  constructor(@InjectModel('country') private readonly countryModel: Model<CountryDocument>) {}

  private byCountryName = new DataLoader<string, CountryAggregate | null>(async names => {
    const countries = await this.countryModel.find({name: names})

    return names
      .map(name => countries.find(country => country.name === name || null))
      .map(country => CountryMapper.toDomain(country))
  })

  private byCountryId = new DataLoader<string, CountryAggregate | null>(async ids => {
    const countries = await this.countryModel.find({_id: ids})
    return ids
      .map(id => countries.find(country => country._id.toString() === id.toString()) || null)
      .map(country => CountryMapper.toDomain(country))
  })

  public async getById(id: string) {
    return this.byCountryId.load(id)
  }

  public async getByName(name: string) {
    return this.byCountryName.load(name)
  }
}
