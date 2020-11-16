import {ICommandHandler} from '../..'
import {CreateGrinderCommand} from '.'
import {Grinder} from '../../../domain/Grinder'

export interface ICreateGrinderCommandHandler extends ICommandHandler<CreateGrinderCommand, Grinder> {}
