import {ICommandHandler} from './ICommandHandler'
import {Producer} from 'kafka-node'
import {DeleteAccountCommand} from './DeleteAccountCommand'
import {IAccountsRepo} from '../../infra/repos'

export class DeleteAccountCommandHandler implements ICommandHandler<DeleteAccountCommand, boolean> {
  constructor(private producer: Producer, private accountsRepo: IAccountsRepo) {}

  public async handle(command: DeleteAccountCommand) {
    const {id} = command
    const account = await this.accountsRepo.getById(id)

    if (!account) {
      throw new Error('Account not found')
    }

    try {
      this.accountsRepo.delete(account.getEntityId().toString())
      return true
    } catch (err) {
      return false
    }
  }
}
