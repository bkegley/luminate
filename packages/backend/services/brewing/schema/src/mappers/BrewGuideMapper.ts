import {EntityId} from '../shared'
import {BrewGuide} from '../domain/BrewGuide'
import {BrewGuideName} from '../domain/BrewGuide/BrewGuideName'
import {BrewGuideDTO} from '../dtos'

export class BrewGuideMapper {
  public static toDomain(brewGuideDTO: BrewGuideDTO) {
    return BrewGuide.create(
      {
        name: BrewGuideName.create({value: brewGuideDTO.name}),
      },
      //TODO: I'm not sure if this should check for provided id
      EntityId.create(brewGuideDTO.id),
    )
  }

  public static toDTO(brewGuide: BrewGuide): BrewGuideDTO {
    return {
      id: brewGuide.id,
      name: brewGuide.name.value,
    }
  }

  public static toPersistence(brewGuide: BrewGuide): any {
    return {
      id: brewGuide.id,
      name: brewGuide.name?.value,
    }
  }
}
