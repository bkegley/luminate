import {EntityId} from '@luminate/services-shared'
import {Brewer} from '../../domain/Brewer'
import {BrewerName} from '../../domain/Brewer/BrewerName'
import {BrewerDTO} from '../dtos'
import {BrewerDescription} from '../../domain/Brewer/BrewerDescription'
import {BrewerType as BrewerTypeEntity} from '../../domain/Brewer/BrewerType'
import {BrewerType} from '../../types'

export class BrewerMapper {
  public static toDomain(obj: any) {
    return Brewer.create(
      {
        name: BrewerName.create({value: obj.name}),
        description: obj.description ? BrewerDescription.create({value: obj.description}) : undefined,
        type: obj.type ? BrewerTypeEntity.create({value: obj.type}) : undefined,
      },
      obj.id ? EntityId.create(obj.id) : undefined,
    )
  }

  public static toDTO(brewer: Brewer): BrewerDTO {
    return {
      id: brewer.id.toString(),
      name: brewer.name.value,
      description: brewer.description?.value,
      type: (brewer.type?.value as unknown) as BrewerType,
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
