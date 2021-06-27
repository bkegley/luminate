import {ICommandHandler} from '@nestjs/cqrs'
import {LoginUserCommand} from '.'

export interface ILoginUserCommandResponse {
  jwtToken: string
  refreshToken: string
}

export interface ILoginUserCommandHandler extends ICommandHandler<LoginUserCommand, ILoginUserCommandResponse> {}
