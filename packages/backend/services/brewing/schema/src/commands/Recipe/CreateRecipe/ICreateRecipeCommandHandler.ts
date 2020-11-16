import {ICommandHandler} from '../..'
import {CreateRecipeCommand, CreateRecipeDTO} from '.'

export interface ICreateRecipeCommandHandler extends ICommandHandler<CreateRecipeCommand, CreateRecipeDTO> {}
