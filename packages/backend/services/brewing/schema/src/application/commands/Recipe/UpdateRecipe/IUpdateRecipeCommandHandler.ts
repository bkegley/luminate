import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateRecipeCommand, UpdateRecipeDTO} from '.'

export interface IUpdateRecipeCommandHandler extends ICommandHandler<UpdateRecipeCommand, UpdateRecipeDTO> {}
