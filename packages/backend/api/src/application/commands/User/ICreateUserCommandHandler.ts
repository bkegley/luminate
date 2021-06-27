import {ICommandHandler} from '@nestjs/cqrs'
import {UserAggregate} from '../../../domain/user/User'
import {CreateUserCommand} from '.'

export interface ICreateUserCommandHandler extends ICommandHandler<CreateUserCommand, UserAggregate> {}
