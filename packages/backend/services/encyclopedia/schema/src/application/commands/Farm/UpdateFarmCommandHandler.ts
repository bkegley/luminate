import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdateFarmCommand} from '.'
import {FarmsRepo} from '../../../infra/repos'
import {FarmMapper} from '../../../infra/mappers'

@CommandHandler(UpdateFarmCommand)
export class UpdateFarmCommandHandler implements ICommandHandler<UpdateFarmCommand> {
  constructor(private readonly farmsRepo: FarmsRepo) {}

  async execute(command: UpdateFarmCommand) {
    const {user, ...farmObj} = command
    const farmDocument = await this.farmsRepo.getById(user, farmObj.id)

    if (!farmDocument) {
      throw new Error('Farm does not exist')
    }

    const farm = FarmMapper.toDomain(farmDocument)

    const attrs = FarmMapper.toAttrs(farmObj)

    farm.update(attrs)

    await this.farmsRepo.save(user, farm)
    return farm
  }
}
