import {CuppingSessionModel, CuppingSessionDocument} from '../models/CuppingSession'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byCuppingSessionId?: DataLoader<string, CuppingSessionDocument | null>
}

export class CuppingSessionService extends AuthenticatedService<CuppingSessionDocument> {
  constructor() {
    super(CuppingSessionModel)

    this.loaders.byCuppingSessionId = new DataLoader<string, CuppingSessionDocument | null>(async ids => {
      const cuppingSessions = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(
        id => cuppingSessions.find(cuppingSession => cuppingSession._id.toString() === id.toString()) || null,
      )
    })
  }

  private loaders: Loaders = {}

  public async getById(id: string) {
    return this.loaders.byCuppingSessionId?.load(id) || null
  }

  public findCuppingSessions(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }

  public updateCuppingSessionCoffees(id: string, sessionCoffees: Array<{sampleNumber: string; coffee: string}>) {
    return this.updateOne({_id: id, locked: false}, {sessionCoffees})
  }

  public lock(id: string) {
    return this.updateOne({_id: id}, {locked: true})
  }

  public createScoreSheet({sessionCoffeeId, input}: {sessionCoffeeId: string; input: any}) {
    // TODO: assign update query to 'updatedCoffee' and if null build error for either invalid id or non-locked session
    return this.updateOne(
      {'sessionCoffees._id': sessionCoffeeId, locked: true},
      {$push: {'sessionCoffees.$.scoreSheets': input}},
      {new: true},
    )
  }

  public updateScoreSheet({
    scoreSheetId,
    sessionCoffeeId,
    input,
  }: {
    scoreSheetId: string
    sessionCoffeeId: string
    input: any
  }) {
    return this.updateOne(
      {sessionCoffees: {$elemMatch: {_id: sessionCoffeeId, 'scoreSheets._id': scoreSheetId}}, locked: true},
      {$set: {'sessionCoffees.$[outer].scoreSheets.$[inner]': {_id: scoreSheetId, ...input}}},
      {
        new: true,
        // @ts-ignore
        arrayFilters: [{'outer._id': sessionCoffeeId}, {'inner._id': scoreSheetId}],
      },
    )
  }

  public deleteScoreSheetById(id: string) {
    return this.updateOne(
      {'sessionCoffees.scoreSheets._id': id, locked: true},
      {$pull: {'sessionCoffees.$.scoreSheets': {_id: id}}},
      {new: true},
    )
  }
}
