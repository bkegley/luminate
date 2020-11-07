import {BrewingSessionConnection, BrewingSession} from '../types'

export interface IBrewingSessionsView {
  listBrewingSessions(): Promise<BrewingSessionConnection>
  getBrewingSessionById(id: string): Promise<BrewingSession>
}
