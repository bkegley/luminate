import {ICommandHandler} from '@nestjs/cqrs'
import {DeleteUserCommand} from '.'

export interface IDeleteUserCommandHandler extends ICommandHandler<DeleteUserCommand, boolean> {}
