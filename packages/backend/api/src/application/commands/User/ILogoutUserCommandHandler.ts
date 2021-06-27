import {ICommandHandler} from '@nestjs/cqrs'
import {LogoutUserCommand} from './LogoutUserCommand'

export interface ILogoutUserCommandHandler extends ICommandHandler<LogoutUserCommand, boolean> {}
