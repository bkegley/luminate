import {EntityId} from '../shared'
import {BrewGuide} from '../domain/BrewGuide'
import {BrewGuideName} from '../domain/BrewGuide/BrewGuideName'
import {BrewGuideDTO} from '../dtos'
import {RecipeId} from '../domain/Recipe/RecipeId'

export class BrewGuideMapper {
  public static toDomain(brewGuideDTO: BrewGuideDTO) {
    return BrewGuide.create(
      {
        name: BrewGuideName.create({value: brewGuideDTO.name}),
        recipeId: RecipeId.create(EntityId.create(brewGuideDTO.recipeId)),
      },
      //TODO: I'm not sure if this should check for provided id
      EntityId.create(brewGuideDTO.id),
    )
  }

  public static toDTO(brewGuide: BrewGuide): BrewGuideDTO {
    return {
      id: brewGuide.id,
      name: brewGuide.name.value,
      recipeId: brewGuide.recipeId.value,
    }
  }

  public static toPersistence(brewGuide: BrewGuide): any {
    return {
      id: brewGuide.id,
      name: brewGuide.name?.value,
      recipeId: brewGuide.recipeId.value,
    }
  }
}
