import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdateCoffeeCommand} from '.'
import {CoffeesRepo} from '../../../infra/repos'
import {CoffeeMapper} from '../../../infra/mappers'

@CommandHandler(UpdateCoffeeCommand)
export class UpdateCoffeeCommandHandler implements ICommandHandler<UpdateCoffeeCommand> {
  constructor(private readonly coffeesRepo: CoffeesRepo) {}

  async execute(command: UpdateCoffeeCommand) {
    const coffeeDocument = await this.coffeesRepo.getById(command.id)

    if (!coffeeDocument) {
      throw new Error('Coffee does not exist')
    }

    const coffee = CoffeeMapper.toDomain(coffeeDocument)

    const attrs = CoffeeMapper.toAttrs(command)

    coffee.update(attrs)

    await this.coffeesRepo.save(coffee)
    return coffeeDocument
  }
}
