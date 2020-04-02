import {CuppingSessionModel, CuppingSessionDocument} from '../models/CuppingSession'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class CuppingSessionService extends AuthenticatedService<CuppingSessionDocument> {
  constructor() {
    super(CuppingSessionModel)
  }

  public findCuppingSessions(conditions: any) {
    return this.model.find(conditions)
  }

  public createScoreSheet({sessionCoffeeId, input}: {sessionCoffeeId: string; input: any}) {
    return this.updateOne(
      {'sessionCoffees._id': sessionCoffeeId},
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
      {sessionCoffees: {$elemMatch: {_id: sessionCoffeeId, 'scoreSheets._id': scoreSheetId}}},
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
      {'sessionCoffees.scoreSheets._id': id},
      {$pull: {'sessionCoffees.$.scoreSheets': {_id: id}}},
      {new: true},
    )
  }
}
