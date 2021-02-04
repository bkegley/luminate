import {EntityId} from '@luminate/services-shared'
import {Grinder} from '../../domain/Grinder'
import {GrinderName} from '../../domain/Grinder/GrinderName'
import {GrinderDTO} from '../dtos'
import {GrinderDescription} from '../../domain/Grinder/GrinderDescription'
import {GrinderBurrSet} from '../../domain/Grinder/GrinderBurrSet'
import {BurrSet} from '../../types'

export class GrinderMapper {
  public static toDomain(grinderDTO: GrinderDTO) {
    return Grinder.create(
      {
        name: GrinderName.create({value: grinderDTO.name}),
        description: grinderDTO.description ? GrinderDescription.create({value: grinderDTO.description}) : null,
        burrSet: grinderDTO.burrSet ? GrinderBurrSet.create({value: grinderDTO.burrSet}) : null,
      },
      EntityId.create(grinderDTO.id),
    )
  }

  public static toDTO(grinder: Grinder): GrinderDTO {
    return {
      id: grinder.id.toString(),
      name: grinder.name.value,
      description: grinder.description?.value,
      burrSet: (grinder.burrSet?.value as unknown) as BurrSet,
    }
  }

  public static toPersistence(grinder: Grinder): any {
    return {
      id: grinder.id.toString(),
      name: grinder.name?.value,
      description: grinder.description?.value,
      burrSet: grinder.burrSet?.value,
    }
  }
}
