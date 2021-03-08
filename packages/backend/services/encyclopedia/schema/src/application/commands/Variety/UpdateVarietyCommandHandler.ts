import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdateVarietyCommand} from '.'
import {VarietiesRepo} from '../../../infra/repos'
import {VarietyMapper} from '../../../infra/mappers'

@CommandHandler(UpdateVarietyCommand)
export class UpdateVarietyCommandHandler implements ICommandHandler<UpdateVarietyCommand> {
  constructor(private readonly varietiesRepo: VarietiesRepo) {}

  async execute(command: UpdateVarietyCommand) {
    const varietyDocument = await this.varietiesRepo.getById(command.id)

    if (!varietyDocument) {
      throw new Error('Variety does not exist')
    }

    const variety = VarietyMapper.toDomain(varietyDocument)

    const attrs = VarietyMapper.toAttrs(command)

    variety.update(attrs)

    await this.varietiesRepo.save(variety)
    return varietyDocument
  }
}
