import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdateFarmCommand} from '.'
import {FarmsRepo} from '../../../infra/repos'
import {FarmMapper} from '../../../infra/mappers'

@CommandHandler(UpdateFarmCommand)
export class UpdateFarmCommandHandler implements ICommandHandler<UpdateFarmCommand> {
  constructor(private readonly farmsRepo: FarmsRepo) {}

  async execute(command: UpdateFarmCommand) {
    const farm = await this.farmsRepo.getById(command.id)

    if (!farm) {
      throw new Error('Farm does not exist')
    }

    const attrs = FarmMapper.toAttrs(command)

    farm.update(attrs)

    await this.farmsRepo.save(farm)
    return farm
  }
}
