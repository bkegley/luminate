import {ICommandHandler} from '@nestjs/cqrs'
import {CreateRecipeCommand} from '.'
import {Recipe} from '../../../../domain/Recipe'

export interface ICreateRecipeCommandHandler extends ICommandHandler<CreateRecipeCommand, Recipe> {}
