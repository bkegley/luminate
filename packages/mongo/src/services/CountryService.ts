import {CountryModel, CountryDocument} from '../models/Country'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class CountryService extends AuthenticatedService<CountryDocument> {
  constructor() {
    super(CountryModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listCountries(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
