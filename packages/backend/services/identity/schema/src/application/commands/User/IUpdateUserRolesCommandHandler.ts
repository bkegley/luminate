import {ICommandHandler} from '@nestjs/cqrs'
import {UserAggregate} from '../../../domain/user/User'
import {UpdateUserRolesCommand} from '.'

export interface IUpdateUserRolesCommandHandler extends ICommandHandler<UpdateUserRolesCommand, UserAggregate> {}
