import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateBrewerCommand} from '.'
import {Brewer} from '../../../../domain/Brewer'

export interface IUpdateBrewerCommandHandler extends ICommandHandler<UpdateBrewerCommand, Brewer> {}
