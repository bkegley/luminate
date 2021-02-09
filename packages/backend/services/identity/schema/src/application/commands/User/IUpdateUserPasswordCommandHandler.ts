import {ICommandHandler} from '@nestjs/cqrs'
import {UserAggregate} from '../../../domain/user/User'
import {UpdateUserPasswordCommand} from '.'

export interface IUpdateUserPasswordCommandHandler extends ICommandHandler<UpdateUserPasswordCommand, UserAggregate> {}
