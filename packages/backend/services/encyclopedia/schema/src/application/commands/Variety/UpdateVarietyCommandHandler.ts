import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdateVarietyCommand} from '.'
import {VarietiesRepo} from '../../../infra/repos'
import {VarietyMapper} from '../../../infra/mappers'

@CommandHandler(UpdateVarietyCommand)
export class UpdateVarietyCommandHandler implements ICommandHandler<UpdateVarietyCommand> {
  constructor(private readonly varietiesRepo: VarietiesRepo) {}

  async execute(command: UpdateVarietyCommand) {
    const variety = await this.varietiesRepo.getById(command.id)

    if (!variety) {
      throw new Error('Variety does not exist')
    }

    const attrs = VarietyMapper.toAttrs(command)

    variety.update(attrs)

    await this.varietiesRepo.save(variety)
    return variety
  }
}
