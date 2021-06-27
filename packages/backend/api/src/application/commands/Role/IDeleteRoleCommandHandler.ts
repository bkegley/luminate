import {ICommandHandler} from '@nestjs/cqrs'
import {DeleteRoleCommand} from '.'

export interface IDeleteRoleCommandHandler extends ICommandHandler<DeleteRoleCommand, boolean> {}
