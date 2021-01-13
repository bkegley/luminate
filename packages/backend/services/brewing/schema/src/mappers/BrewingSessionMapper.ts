import {EntityId} from '../shared'
import {BrewingSession} from '../domain/BrewingSession'
import {BrewingSessionDTO} from '../dtos'
import {BrewingSessionDescription} from '../domain/BrewingSession/BrewingSessionDescription'
import {DateEntity} from '../domain/Date'

export class BrewingSessionMapper {
  public static toDomain(brewingSessionDTO: BrewingSessionDTO) {
    return BrewingSession.create(
      {
        date: brewingSessionDTO.date ? DateEntity.create({value: brewingSessionDTO.date}) : null,
        description: brewingSessionDTO.description
          ? BrewingSessionDescription.create({value: brewingSessionDTO.description})
          : null,
        brewGuideId: EntityId.create(brewingSessionDTO.brewGuideId),
      },
      //TODO: I'm not sure if this should check for provided id
      EntityId.create(brewingSessionDTO.id),
    )
  }

  public static toDTO(brewingSession: BrewingSession): BrewingSessionDTO {
    return {
      id: brewingSession.id.toString(),
      date: brewingSession.date.value?.toString(),
      description: brewingSession.description?.value,
      brewGuideId: brewingSession.brewGuideId.toString(),
    }
  }

  public static toPersistence(brewingSession: BrewingSession): any {
    return {
      id: brewingSession.id.toString(),
      date: brewingSession.date?.value.toString(),
      description: brewingSession.description?.value,
    }
  }
}
