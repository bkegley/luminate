import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdateCoffeeCommand} from '.'
import {CoffeesRepo} from '../../../infra/repos'
import {CoffeeMapper} from '../../../infra/mappers'

@CommandHandler(UpdateCoffeeCommand)
export class UpdateCoffeeCommandHandler implements ICommandHandler<UpdateCoffeeCommand> {
  constructor(private readonly coffeesRepo: CoffeesRepo) {}

  async execute(command: UpdateCoffeeCommand) {
    const coffee = await this.coffeesRepo.getById(command.id)

    if (!coffee) {
      throw new Error('Coffee does not exist')
    }

    const attrs = CoffeeMapper.toAttrs(command)

    coffee.update(attrs)

    await this.coffeesRepo.save(coffee)
    return coffee
  }
}
