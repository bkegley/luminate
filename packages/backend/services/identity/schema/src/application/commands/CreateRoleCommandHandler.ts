import {Producer} from 'kafka-node'
import {CreateRoleCommand, ICommandHandler} from '.'
import {IRolesRepo} from '../../infra/repos'
import {RoleAggregate} from '../../domain/role/Role'
import {EntityId} from '@luminate/services-shared'
import {RoleScope} from '../../domain/role/RoleScope'

export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand, RoleAggregate> {
  constructor(private producer: Producer, private rolesRepo: IRolesRepo) {}

  public async handle(command: CreateRoleCommand) {
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
    return role
  }
}
