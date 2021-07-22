import {ICommandHandler} from '@nestjs/cqrs'
import {DeleteGrinderCommand} from '.'
import {Grinder} from '../../../../domain/Grinder'

export interface IDeleteGrinderCommandHandler extends ICommandHandler<DeleteGrinderCommand, Grinder> {}
