import {EntityId} from '@luminate/services-shared'
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CoffeeAggregate} from '../../../domain/Coffee/Coffee'
import {CoffeeName} from '../../../domain/Coffee/CoffeeName'
import {CoffeesRepo} from '../../../infra/repos'
import {CreateCoffeeCommand} from './CreateCoffeeCommand'

@CommandHandler(CreateCoffeeCommand)
export class CreateCoffeeCommandHandler implements ICommandHandler<CreateCoffeeCommand, CoffeeAggregate> {
  constructor(private readonly eventBus: EventBus, private readonly coffeesRepo: CoffeesRepo) {}

  async execute(command: CreateCoffeeCommand) {
    const existingCoffee = await this.coffeesRepo.getByName(command.name)

    if (existingCoffee) {
      throw new Error('Coffee already exists')
    }

    const coffee = CoffeeAggregate.create({
      name: CoffeeName.create(command.name),
      country: command.country ? EntityId.create(command.country) : undefined,
      region: command.region ? EntityId.create(command.region) : undefined,
    })

    await this.coffeesRepo.save(coffee)
    coffee.events.forEach(event => this.eventBus.publish(event))

    return coffee
  }
}
