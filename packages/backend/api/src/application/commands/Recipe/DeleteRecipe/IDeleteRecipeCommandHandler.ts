import {ICommandHandler} from '@nestjs/cqrs'
import {DeleteRecipeCommand} from '.'
import {Recipe} from '../../../../domain/Recipe'

export interface IDeleteRecipeCommandHandler extends ICommandHandler<DeleteRecipeCommand, Recipe> {}
