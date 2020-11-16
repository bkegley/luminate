import {ICommandHandler} from '../..'
import {DeleteBrewingSessionCommand} from '.'
import {BrewingSession} from '../../../domain/BrewingSession'

export interface IDeleteBrewingSessionCommandHandler
  extends ICommandHandler<DeleteBrewingSessionCommand, BrewingSession> {}
