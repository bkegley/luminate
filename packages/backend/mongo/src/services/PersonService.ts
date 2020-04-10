import {PersonModel, PersonDocument} from '../models/Person'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byPersonId?: DataLoader<string, PersonDocument | null>
}

export class PersonService extends AuthenticatedService<PersonDocument> {
  constructor() {
    super(PersonModel)

    this.loaders.byPersonId = new DataLoader<string, PersonDocument | null>(async ids => {
      const people = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => people.find(person => person._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public findPeople(conditions: any) {
    return this.model.find(conditions)
  }
}
