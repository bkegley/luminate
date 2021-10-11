import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateMeCommand} from '.'
import {UserAggregate} from '../../../domain/User/User'

export interface IUpdateMeCommandHandler extends ICommandHandler<UpdateMeCommand, UserAggregate> {}
