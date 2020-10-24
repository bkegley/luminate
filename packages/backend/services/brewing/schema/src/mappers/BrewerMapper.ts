import {EntityId} from '../shared'
import {Brewer} from '../domain/Brewer'
import {BrewerName} from '../domain/Brewer/BrewerName'
import {BrewerDTO} from '../dtos'
import {BrewerDescription} from '../domain/Brewer/BrewerDescription'
import {BrewerType, BrewerTypeEnum} from '../domain/Brewer/BrewerType'
import {BrewerType as BrewerTypeDTO} from '../types'

export class BrewerMapper {
  public static toDomain(brewerDTO: BrewerDTO) {
    return Brewer.create(
      {
        name: BrewerName.create({value: brewerDTO.name}),
        description: brewerDTO.description ? BrewerDescription.create({value: brewerDTO.description}) : null,
        type: brewerDTO.type ? BrewerType.create({value: (brewerDTO.type as unknown) as BrewerTypeEnum}) : null,
      },
      //TODO: I'm not sure if this should check for provided id
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

  public static toPersistence(brewer: Brewer): any {
    return {
      id: brewer.id.toString(),
      name: brewer.name?.value,
      description: brewer.description?.value,
      type: brewer.type?.value,
    }
  }
}
