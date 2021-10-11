import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateAccountCommand} from '.'
import {AccountAggregate} from '../../../domain/Account/Account'

export interface IUpdateAccountCommandHandler extends ICommandHandler<UpdateAccountCommand, AccountAggregate> {}
