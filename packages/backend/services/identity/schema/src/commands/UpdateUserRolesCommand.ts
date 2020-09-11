export class UpdateUserRolesCommand {
  id: string
  roles: string[]
  account: string

  constructor({id, roles, account}: {id: string; roles: string[]; account: string}) {
    this.id = id
    this.roles = roles
    this.account = account
  }
}
