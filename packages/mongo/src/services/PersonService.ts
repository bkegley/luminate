import {PersonModel, PersonDocument} from '../models/Person'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class PersonService extends AuthenticatedService<PersonDocument> {
  constructor() {
    super(PersonModel)
  }

  public findPeople(conditions: any) {
    return this.model.find(conditions)
  }
}
