import {ICommandHandler} from '@nestjs/cqrs'
import {DeleteRecipeCommand} from '.'

export interface IDeleteRecipeCommandHandler extends ICommandHandler<DeleteRecipeCommand, boolean> {}
