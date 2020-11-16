import {ICommandHandler} from '../..'
import {UpdateBrewGuideCommand} from '.'
import {BrewGuide} from '../../../domain/BrewGuide'

export interface IUpdateBrewGuideCommandHandler extends ICommandHandler<UpdateBrewGuideCommand, BrewGuide> {}
