import {BrewerConnection, Brewer} from '../../types'

export interface IBrewersView {
  listBrewers(): Promise<BrewerConnection>
  getBrewerById(id: string): Promise<Brewer>
}
