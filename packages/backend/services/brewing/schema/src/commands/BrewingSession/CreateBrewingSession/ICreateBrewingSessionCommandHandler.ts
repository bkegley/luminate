import {ICommandHandler} from '../..'
import {CreateBrewingSessionCommand} from '.'
import {BrewingSession} from '../../../domain/BrewingSession'

export interface ICreateBrewingSessionCommandHandler
  extends ICommandHandler<CreateBrewingSessionCommand, BrewingSession> {}
