import {CuppingSessionModel, CuppingSessionDocument} from '../models/CuppingSession'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class CuppingSessionService extends AuthenticatedService<CuppingSessionDocument> {
  constructor() {
    super(CuppingSessionModel)
  }

  public getCuppingSessionById(id: string) {
    return this.getById(id)
  }

  public listCuppingSessions(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }

  public createCuppingSession(input: any) {
    return this.create(input)
  }

  public updateCuppingSessionById(id: string, input: any) {
    return this.updateById(id, input)
  }

  public deleteCuppingSessionById(id: string) {
    return this.delete(id)
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
