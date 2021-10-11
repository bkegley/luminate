import {ICommandHandler} from '@nestjs/cqrs'
import {RoleAggregate} from '../../../domain/Role/Role'
import {CreateRoleCommand} from '.'

export interface ICreateRoleCommandHandler extends ICommandHandler<CreateRoleCommand, RoleAggregate> {}
