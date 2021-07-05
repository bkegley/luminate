import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {VarietyAggregate} from '../../../domain/Variety/Variety'
import {VarietyMapper} from '../../../infra/mappers'
import {VarietiesRepo} from '../../../infra/repos'
import {CreateVarietyCommand} from './CreateVarietyCommand'

@CommandHandler(CreateVarietyCommand)
export class CreateVarietyCommandHandler implements ICommandHandler<CreateVarietyCommand, VarietyAggregate> {
  constructor(private readonly eventBus: EventBus, private readonly varietiesRepo: VarietiesRepo) {}

  async execute(command: CreateVarietyCommand) {
    const variety = VarietyAggregate.create({
      name: command.name,
    })

    await this.varietiesRepo.create(VarietyMapper.toPersistence(variety))
    variety.events.forEach(event => this.eventBus.publish(event))

    return variety
  }
}
