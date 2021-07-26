import {Token} from '@luminate/mongo-utils'
import {IRepo} from '../IRepo'
import {CuppingSessionDocument} from '../../models'

export interface ICuppingSessionsRepo extends IRepo<CuppingSessionDocument> {
  getByInternalId: (user: Token, id: string) => Promise<CuppingSessionDocument>
}
