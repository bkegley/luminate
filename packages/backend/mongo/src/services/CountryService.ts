import {CountryModel, CountryDocument} from '../models/Country'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'
import {BaseService} from '../abstract/BaseService'
import {IListDocumentsArgs} from '../abstract/types'

interface Loaders {
  byCountryName?: DataLoader<string, CountryDocument | null>
}

export class CountryService extends BaseService<CountryDocument> {
  constructor() {
    super(CountryModel)
    this.loaders.byCountryName = new DataLoader<string, CountryDocument | null>(async names => {
      const countries = await this.model.find({name: names})
      return names.map(name => countries.find(country => country.name === name) || null)
    })
  }

  private loaders: Loaders = {}

  public async upsert(country: any) {
    return this.model.findOneAndUpdate({name: country.name}, country, {upsert: true})
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    return super.getConnectionResults({...args, sortBy: {field: 'name', descending: true}})
  }

  public findCountries(conditions?: {[x: string]: any}) {
    return this.model.find(conditions)
  }

  public async getByName(name: string) {
    return this.loaders.byCountryName?.load(name) || null
  }
}
