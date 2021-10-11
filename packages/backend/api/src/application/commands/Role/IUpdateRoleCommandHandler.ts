import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateRoleCommand} from '.'
import {RoleAggregate} from '../../../domain/Role/Role'

export interface IUpdateRoleCommandHandler extends ICommandHandler<UpdateRoleCommand, RoleAggregate> {}
