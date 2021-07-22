import {ICommandHandler} from '@nestjs/cqrs'
import {DeleteBrewingSessionCommand} from '.'
import {BrewingSession} from '../../../../domain/BrewingSession'

export interface IDeleteBrewingSessionCommandHandler
  extends ICommandHandler<DeleteBrewingSessionCommand, BrewingSession> {}
