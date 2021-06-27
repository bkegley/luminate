import {EntityId} from '@luminate/ddd'
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {CoffeeAggregate} from '../../../domain/Coffee/Coffee'
import {CoffeeName} from '../../../domain/Coffee/CoffeeName'
import {CoffeeMapper} from '../../../infra/mappers'
import {CoffeesRepo} from '../../../infra/repos'
import {CreateCoffeeCommand} from './CreateCoffeeCommand'

@CommandHandler(CreateCoffeeCommand)
export class CreateCoffeeCommandHandler implements ICommandHandler<CreateCoffeeCommand, CoffeeAggregate> {
  constructor(private readonly eventBus: EventBus, private readonly coffeesRepo: CoffeesRepo) {}

  async execute(command: CreateCoffeeCommand) {
    const coffee = CoffeeAggregate.create({
      name: CoffeeName.create(command.name),
      countryId: command.country ? EntityId.create(command.country) : undefined,
      regionId: command.region ? EntityId.create(command.region) : undefined,
    })

    await this.coffeesRepo.create(command.user, CoffeeMapper.toPersistence(coffee))
    coffee.events.forEach(event => this.eventBus.publish(event))

    return coffee
  }
}
