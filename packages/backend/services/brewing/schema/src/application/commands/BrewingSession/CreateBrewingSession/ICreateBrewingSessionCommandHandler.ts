import {ICommandHandler} from '@nestjs/cqrs'
import {CreateBrewingSessionCommand} from '.'
import {BrewingSession} from '../../../../domain/BrewingSession'

export interface ICreateBrewingSessionCommandHandler
  extends ICommandHandler<CreateBrewingSessionCommand, BrewingSession> {}
