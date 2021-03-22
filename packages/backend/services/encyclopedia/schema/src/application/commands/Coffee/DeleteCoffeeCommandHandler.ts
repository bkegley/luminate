import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {DeleteCoffeeCommand} from '.'
import {CoffeesRepo} from '../../../infra/repos'

@CommandHandler(DeleteCoffeeCommand)
export class DeleteCoffeeCommandHandler implements ICommandHandler<DeleteCoffeeCommand> {
  constructor(private readonly coffeesRepo: CoffeesRepo) {}

  async execute(command: DeleteCoffeeCommand) {
    return this.coffeesRepo.delete(command.user, command.id)
  }
}
