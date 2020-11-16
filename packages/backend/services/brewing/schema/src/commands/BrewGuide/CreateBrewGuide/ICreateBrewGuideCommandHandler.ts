import {ICommandHandler} from '../..'
import {CreateBrewGuideCommand} from '.'
import {BrewGuide} from '../../../domain/BrewGuide'

export interface ICreateBrewGuideCommandHandler extends ICommandHandler<CreateBrewGuideCommand, BrewGuide> {}
