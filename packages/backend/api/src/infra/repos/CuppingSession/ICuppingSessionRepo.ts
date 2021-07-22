import {IRepo} from '../IRepo'
import {CuppingSessionDocument} from '../../models'

export interface ICuppingSessionsRepo extends IRepo<CuppingSessionDocument> {
  getByInternalId: (id: string) => Promise<CuppingSessionDocument>
}
