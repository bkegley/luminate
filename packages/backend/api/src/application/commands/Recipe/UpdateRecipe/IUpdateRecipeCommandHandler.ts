import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateRecipeCommand} from '.'
import {Recipe} from '../../../../domain/Recipe'

export interface IUpdateRecipeCommandHandler extends ICommandHandler<UpdateRecipeCommand, Recipe> {}
