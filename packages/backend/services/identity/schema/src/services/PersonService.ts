import {PersonModel, PersonDocument} from '../models'
import {AuthenticatedService, Token} from '@luminate/mongo-utils'
import DataLoader from 'dataloader'

interface Loaders {
  byPersonId?: DataLoader<string, PersonDocument | null>
}

export class PersonService extends AuthenticatedService<PersonDocument> {
  constructor(user: Token | null) {
    super(PersonModel, user)

    this.loaders.byPersonId = new DataLoader<string, PersonDocument | null>(async ids => {
      const people = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => people.find(person => person._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public findPeople(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }
}
