import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateMeCommand} from '.'
import {UserAggregate} from '../../../domain/user/User'

export interface IUpdateMeCommandHandler extends ICommandHandler<UpdateMeCommand, UserAggregate> {}
