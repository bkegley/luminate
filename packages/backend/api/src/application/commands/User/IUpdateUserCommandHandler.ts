import {ICommandHandler} from '@nestjs/cqrs'
import {UserAggregate} from '../../../domain/User/User'
import {UpdateUserCommand} from '.'

export interface IUpdateUserCommandHandler extends ICommandHandler<UpdateUserCommand, UserAggregate> {}
