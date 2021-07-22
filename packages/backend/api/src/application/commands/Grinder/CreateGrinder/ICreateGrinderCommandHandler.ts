import {ICommandHandler} from '@nestjs/cqrs'
import {CreateGrinderCommand} from '.'
import {Grinder} from '../../../../domain/Grinder'

export interface ICreateGrinderCommandHandler extends ICommandHandler<CreateGrinderCommand, Grinder> {}
