import {CountryModel, CountryDocument} from '../models/Country'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class CountryService extends AuthenticatedService<CountryDocument> {
  constructor() {
    super(CountryModel)
  }

  public findCountries(conditions: any) {
    return this.model.find(conditions)
  }
}
