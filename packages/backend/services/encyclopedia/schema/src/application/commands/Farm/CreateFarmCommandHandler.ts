import {EntityId} from '@luminate/services-shared'
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {FarmAggregate} from '../../../domain/Farm/Farm'
import {FarmsRepo} from '../../../infra/repos'
import {CreateFarmCommand} from './CreateFarmCommand'

@CommandHandler(CreateFarmCommand)
export class CreateFarmCommandHandler implements ICommandHandler<CreateFarmCommand, FarmAggregate> {
  constructor(private readonly eventBus: EventBus, private readonly farmsRepo: FarmsRepo) {}

  async execute(command: CreateFarmCommand) {
    const farm = FarmAggregate.create({
      name: command.name,
      countryId: command.country ? EntityId.create(command.country) : undefined,
      regionId: command.region ? EntityId.create(command.region) : undefined,
    })

    await this.farmsRepo.save(farm)
    farm.events.forEach(event => this.eventBus.publish(event))

    return farm
  }
}
