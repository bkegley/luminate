import {ICommandHandler} from '@nestjs/cqrs'
import {UserAggregate} from '../../../domain/User/User'
import {CreateUserCommand} from '.'

export interface ICreateUserCommandHandler extends ICommandHandler<CreateUserCommand, UserAggregate> {}
