import {EntityId} from '@luminate/ddd'
import {BrewingSession, BrewingSessionAttributes} from '../../domain/BrewingSession'
import {IBrewingSessionDTO} from '../dtos'
import {BrewingSessionDescription} from '../../domain/BrewingSession/BrewingSessionDescription'
import {DateEntity} from '../../domain/Date'

export class BrewingSessionMapper {
  public static toAttrs(obj: any): BrewingSessionAttributes {
    return {
      date: obj.date ? DateEntity.create({value: obj.date}) : null,
      description: obj.description ? BrewingSessionDescription.create({value: obj.description}) : null,
      brewGuideId: EntityId.create(obj.brewGuideId),
    }
  }

  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = BrewingSessionMapper.toAttrs(obj)

    return BrewingSession.create(attrs, EntityId.create(id))
  }

  public static toDTO(brewingSession: BrewingSession): IBrewingSessionDTO {
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
