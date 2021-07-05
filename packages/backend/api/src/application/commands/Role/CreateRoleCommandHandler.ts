import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {CreateRoleCommand, ICreateRoleCommandHandler} from '.'
import {RoleAggregate} from '../../../domain/role/Role'
import {EntityId} from '@luminate/ddd'
import {RoleScope} from '../../../domain/role/RoleScope'
import {RolesRepo} from '../../../infra/repos'
import {RoleMapper} from '../../../infra/mappers'

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler implements ICreateRoleCommandHandler {
  constructor(private eventBus: EventBus, private rolesRepo: RolesRepo) {}

  public async execute(command: CreateRoleCommand) {
    const existingRole = await this.rolesRepo.getByName(command.name)

    if (existingRole) {
      throw new Error('Role name taken')
    }

    const role = RoleAggregate.create({
      name: command.name,
      account: EntityId.create(command.account),
      scopes: command.scopes as RoleScope[],
    })

    await this.rolesRepo.create(RoleMapper.toPersistence(role))
    role.events.forEach(event => this.eventBus.publish(event))
    return role
  }
}
