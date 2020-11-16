import {ICommandHandler} from '../..'
import {DeleteBrewGuideCommand} from '.'
import {BrewGuide} from '../../../domain/BrewGuide'

export interface IDeleteBrewGuideCommandHandler extends ICommandHandler<DeleteBrewGuideCommand, BrewGuide> {}
