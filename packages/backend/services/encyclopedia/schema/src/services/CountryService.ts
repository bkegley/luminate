import {CountryModel, CountryDocument} from '../infra/models'
import {BaseService, IListDocumentsArgs} from '@luminate/mongo-utils'
import DataLoader from 'dataloader'

interface Loaders {
  byCountryName?: DataLoader<string, CountryDocument | null>
  byCountryId?: DataLoader<string, CountryDocument | null>
}

export class CountryService extends BaseService<CountryDocument> {
  constructor() {
    super(CountryModel)
    this.loaders.byCountryName = new DataLoader<string, CountryDocument | null>(async names => {
      const countries = await this.model.find({name: names})
      return names.map(name => countries.find(country => country.name === name) || null)
    })
    this.loaders.byCountryId = new DataLoader<string, CountryDocument | null>(async ids => {
      const countries = await this.model.find({_id: ids})
      return ids.map(id => countries.find(country => country._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public async upsert(country: any) {
    return this.model.findOneAndUpdate({name: country.name}, country, {upsert: true, new: true})
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    return super.getConnectionResults({...args, sortBy: {field: 'name', descending: true}})
  }

  public findCountries(conditions?: {[x: string]: any}) {
    return this.model.find(conditions)
  }

  public async getById(id: string) {
    return this.loaders.byCountryId?.load(id) || null
  }

  public async getByName(name: string) {
    return this.loaders.byCountryName?.load(name) || null
  }
}
