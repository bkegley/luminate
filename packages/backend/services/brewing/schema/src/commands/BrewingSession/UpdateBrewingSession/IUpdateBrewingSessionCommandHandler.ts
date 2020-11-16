import {ICommandHandler} from '../..'
import {UpdateBrewingSessionCommand} from '.'
import {BrewingSession} from '../../../domain/BrewingSession'

export interface IUpdateBrewingSessionCommandHandler
  extends ICommandHandler<UpdateBrewingSessionCommand, BrewingSession> {}
