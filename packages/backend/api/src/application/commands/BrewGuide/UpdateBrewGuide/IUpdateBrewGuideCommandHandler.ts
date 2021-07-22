import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateBrewGuideCommand} from '.'
import {BrewGuide} from '../../../../domain/BrewGuide'

export interface IUpdateBrewGuideCommandHandler extends ICommandHandler<UpdateBrewGuideCommand, BrewGuide> {}
