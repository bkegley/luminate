import {BrewGuideConnection, BrewGuide} from '../../types'

export interface IBrewGuidesView {
  listBrewGuides(): Promise<BrewGuideConnection>
  getBrewGuideById(id: string): Promise<BrewGuide>
}
