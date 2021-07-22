import {IRepo} from '../IRepo'
import {BrewGuideDocument} from '../../models'

export interface IBrewGuidesRepo extends IRepo<BrewGuideDocument> {
  getByName(name: string): Promise<BrewGuideDocument>
}
