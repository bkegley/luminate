import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateBrewingSessionCommand} from '.'
import {BrewingSession} from '../../../../domain/BrewingSession'

export interface IUpdateBrewingSessionCommandHandler
  extends ICommandHandler<UpdateBrewingSessionCommand, BrewingSession> {}
