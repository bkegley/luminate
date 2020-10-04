import {EntityId} from '../shared'
import {Brewer} from '../domain/Brewer'
import {BrewerName} from '../domain/BrewerName'
import {BrewerDTO} from '../dtos'
import {BrewerDescription} from '../domain/BrewerDescription'
import {BrewerType, BrewerTypeEnum} from '../domain/BrewerType'
import {BrewerType as BrewerTypeDTO} from '../types'

export class BrewerMapper {
  public static toDomain(brewerDTO: BrewerDTO) {
    return Brewer.create(
      {
        name: BrewerName.create({value: brewerDTO.name}),
        description: brewerDTO.description ? BrewerDescription.create({value: brewerDTO.description}) : null,
        type: brewerDTO.type ? BrewerType.create({value: (brewerDTO.type as unknown) as BrewerTypeEnum}) : null,
      },
      EntityId.create(brewerDTO.id),
    )
  }

  public static toDTO(brewer: Brewer): BrewerDTO {
    return {
      id: brewer.id.toString(),
      name: brewer.name.value,
      description: brewer.description?.value,
      type: (brewer.type?.value as unknown) as BrewerTypeDTO,
    }
  }

  public static toPersistence(brewer: Brewer) {
    return {
      id: brewer.id.toString(),
      name: brewer.name?.value,
      description: brewer.description?.value,
      type: (brewer.type?.value as unknown) as BrewerTypeDTO,
    }
  }
}
