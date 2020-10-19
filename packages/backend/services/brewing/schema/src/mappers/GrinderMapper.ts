import {EntityId} from '../shared'
import {Grinder} from '../domain/Grinder'
import {GrinderName} from '../domain/GrinderName'
import {GrinderDTO} from '../dtos'
import {GrinderDescription} from '../domain/GrinderDescription'
import {GrinderBurrSet, GrinderBurrSetEnum} from '../domain/GrinderBurrSet'

export class GrinderMapper {
  public static toDomain(grinderDTO: GrinderDTO) {
    return Grinder.create(
      {
        name: GrinderName.create({value: grinderDTO.name}),
        description: grinderDTO.description ? GrinderDescription.create({value: grinderDTO.description}) : null,
        burrSet: grinderDTO.burrSet
          ? GrinderBurrSet.create({value: (grinderDTO.burrSet as unknown) as GrinderBurrSetEnum})
          : null,
      },
      EntityId.create(grinderDTO.id),
    )
  }

  public static toDTO(grinder: Grinder): GrinderDTO {
    return {
      id: grinder.id.toString(),
      name: grinder.name.value,
      description: grinder.description?.value,
      burrSet: grinder.burrSet?.value,
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
