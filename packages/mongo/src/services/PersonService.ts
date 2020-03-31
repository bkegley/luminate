import {PersonModel, PersonDocument} from '../models/Person'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class PersonService extends AuthenticatedService<PersonDocument> {
  constructor() {
    super(PersonModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listPeople(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
