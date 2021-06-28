import {IRepo} from '../IRepo'
import {VarietyDocument} from '../../models'

export interface IVarietiesRepo extends IRepo<VarietyDocument> {
  getByName(name: string): Promise<VarietyDocument>
}
