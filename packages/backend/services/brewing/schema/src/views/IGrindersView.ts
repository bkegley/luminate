import {GrinderConnection, Grinder} from '../types'

export interface IGrindersView {
  listGrinders(): Promise<GrinderConnection>
  getGrinderById(id: string): Promise<Grinder>
}
