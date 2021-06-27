import {ICommandHandler} from '@nestjs/cqrs'
import {AddUserToAccountCommand} from './AddUserToAccountCommand'

export interface IAddUserToAccountCommandHandler extends ICommandHandler<AddUserToAccountCommand, boolean> {}
