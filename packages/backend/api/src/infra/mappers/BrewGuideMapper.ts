import {EntityId} from '@luminate/ddd'
import {BrewGuide, BrewGuideAttributes} from '../../domain/BrewGuide'
import {BrewGuideInstructions} from '../../domain/BrewGuide/BrewGuideInstructions'
import {BrewGuideName} from '../../domain/BrewGuide/BrewGuideName'
import {BrewGuideOverview} from '../../domain/BrewGuide/BrewGuideOverview'
import {IBrewGuideDTO} from '../dtos'

export class BrewGuideMapper {
  public static toAttrs(obj: any): BrewGuideAttributes {
    return {
      name: BrewGuideName.create({value: obj.name}),
      recipeId: EntityId.create(obj.recipeId),
      overview: obj.overview ? BrewGuideOverview.create({value: obj.overview}) : undefined,
      instructions: obj.instructions ? BrewGuideInstructions.create({value: obj.instructions}) : undefined,
    }
  }
  public static toDomain(obj: any) {
    const attrs = BrewGuideMapper.toAttrs(obj)
    return BrewGuide.create(
      attrs,
      //TODO: I'm not sure if this should check for provided id
      EntityId.create(obj.id),
    )
  }

  public static toDTO(brewGuide: BrewGuide): IBrewGuideDTO {
    return {
      id: brewGuide.id,
      name: brewGuide.name.value,
      recipeId: brewGuide.recipeId.toString(),
    }
  }

  public static toPersistence(brewGuide: BrewGuide): any {
    return {
      id: brewGuide.id,
      name: brewGuide.name?.value,
      recipeId: brewGuide.recipeId.toString(),
    }
  }
}
