import {ICommandHandler} from '@nestjs/cqrs'
import {UserAggregate} from '../../../domain/User/User'
import {UpdateUserPasswordCommand} from '.'

export interface IUpdateUserPasswordCommandHandler extends ICommandHandler<UpdateUserPasswordCommand, UserAggregate> {}
