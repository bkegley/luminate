import {EntityId} from '../shared'
import {Brewer} from '../domain/Brewer'
import {BrewerName} from '../domain/BrewerName'
import {BrewerDTO} from '../dtos'

export class BrewerMapper {
  public static toDomain(brewerDTO: BrewerDTO) {
    return Brewer.create(
      {
        name: BrewerName.create({value: brewerDTO.name}),
      },
      EntityId.create(brewerDTO.id),
    )
  }

  public static toDTO(brewer: Brewer): BrewerDTO {
    return {
      id: brewer.id.toString(),
      name: brewer.name.value,
    }
  }

  public static toPersistence(brewer: Brewer) {
    return {
      id: brewer.id.toString(),
      name: brewer.name.value,
    }
  }
}
