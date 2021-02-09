import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {CreateRoleCommand, ICreateRoleCommandHandler} from '.'
import {RoleAggregate} from '../../../domain/role/Role'
import {EntityId} from '@luminate/services-shared'
import {RoleScope} from '../../../domain/role/RoleScope'
import {RolesRepo} from '../../../infra/repos'

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

    await this.rolesRepo.save(role)
    role.events.forEach(event => this.eventBus.publish(event))
    return role
  }
}
