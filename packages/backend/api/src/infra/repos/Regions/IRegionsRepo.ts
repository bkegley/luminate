import {IRepo} from '../IRepo'
import {RegionDocument} from '../../models'

export interface IRegionsRepo extends IRepo<RegionDocument> {
  getByName(name: string): Promise<RegionDocument>
}
