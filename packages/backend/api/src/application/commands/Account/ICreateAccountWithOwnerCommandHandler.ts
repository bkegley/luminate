import {ICommandHandler} from '@nestjs/cqrs'
import {AccountAggregate} from '../../../domain/Account/Account'
import {CreateAccountWithOwnerCommand} from './CreateAccountWithOwnerCommand'

export interface ICreateAccountWithOwnerCommandHandler
  extends ICommandHandler<CreateAccountWithOwnerCommand, AccountAggregate> {}
