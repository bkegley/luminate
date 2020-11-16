import {ICommandHandler} from '../..'
import {DeleteGrinderCommand} from '.'
import {Grinder} from '../../../domain/Grinder'

export interface IDeleteGrinderCommandHandler extends ICommandHandler<DeleteGrinderCommand, Grinder> {}
