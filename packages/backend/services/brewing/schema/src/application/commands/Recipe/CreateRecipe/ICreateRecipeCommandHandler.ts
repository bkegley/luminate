import {ICommandHandler} from '@nestjs/cqrs'
import {CreateRecipeCommand, CreateRecipeDTO} from '.'

export interface ICreateRecipeCommandHandler extends ICommandHandler<CreateRecipeCommand, CreateRecipeDTO> {}
