import {CuppingSessionModel, CuppingSessionDocument} from '../models/CuppingSession'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class CuppingSessionService extends AuthenticatedService<CuppingSessionDocument> {
  constructor() {
    super(CuppingSessionModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listCuppingSessions(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
