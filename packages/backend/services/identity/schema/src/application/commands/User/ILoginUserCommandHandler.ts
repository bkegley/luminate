import {ICommandHandler} from '@nestjs/cqrs'
import {LoginUserCommand} from '.'

export interface ILoginUserCommandHandler extends ICommandHandler<LoginUserCommand, string> {}
