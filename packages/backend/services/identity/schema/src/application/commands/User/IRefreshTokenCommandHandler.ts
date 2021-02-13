import {ICommandHandler} from '@nestjs/cqrs'
import {RefreshTokenCommand} from '.'

export interface IRefreshTokenCommandHandler extends ICommandHandler<RefreshTokenCommand, string> {}
