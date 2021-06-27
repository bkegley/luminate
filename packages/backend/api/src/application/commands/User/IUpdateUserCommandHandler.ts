import {ICommandHandler} from '@nestjs/cqrs'
import {UserAggregate} from '../../../domain/user/User'
import {UpdateUserCommand} from '.'

export interface IUpdateUserCommandHandler extends ICommandHandler<UpdateUserCommand, UserAggregate> {}
