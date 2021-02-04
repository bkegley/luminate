import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateGrinderCommand} from '.'
import {Grinder} from '../../../../domain/Grinder'

export interface IUpdateGrinderCommandHandler extends ICommandHandler<UpdateGrinderCommand, Grinder> {}
