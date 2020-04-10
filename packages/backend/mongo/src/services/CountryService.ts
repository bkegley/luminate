import {CountryModel, CountryDocument} from '../models/Country'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byCountryId?: DataLoader<string, CountryDocument | null>
}

export class CountryService extends AuthenticatedService<CountryDocument> {
  constructor() {
    super(CountryModel)
    this.loaders.byCountryId = new DataLoader<string, CountryDocument | null>(async ids => {
      const countries = await this.model.find({_id: ids})
      return ids.map(id => countries.find(country => country._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public findCountries(conditions: any) {
    return this.model.find(conditions)
  }

  public async getById(id: string) {
    return this.loaders.byCountryId?.load(id) || null
  }
}
