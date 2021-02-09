import {ICommandHandler} from '@nestjs/cqrs'
import {DeleteAccountCommand} from '.'

export interface IDeleteAccountCommandHandler extends ICommandHandler<DeleteAccountCommand, boolean> {}
