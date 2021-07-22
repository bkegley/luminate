import {IRepo} from '../IRepo'
import {BrewerDocument} from '../../models'

export interface IBrewersRepo extends IRepo<BrewerDocument> {
  getByName: (name: string) => Promise<BrewerDocument>
}
