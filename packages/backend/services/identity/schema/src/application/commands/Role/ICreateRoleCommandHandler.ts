import {ICommandHandler} from '@nestjs/cqrs'
import {RoleAggregate} from '../../../domain/role/Role'
import {CreateRoleCommand} from '.'

export interface ICreateRoleCommandHandler extends ICommandHandler<CreateRoleCommand, RoleAggregate> {}
