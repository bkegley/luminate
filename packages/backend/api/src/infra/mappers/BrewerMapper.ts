import {EntityId} from '@luminate/ddd'
import {Brewer, BrewerAttributes} from '../../domain/Brewer'
import {BrewerName} from '../../domain/Brewer/BrewerName'
import {BrewerDescription} from '../../domain/Brewer/BrewerDescription'
import {BrewerType} from '../../domain/Brewer/BrewerType'
import {IBrewerDTO} from '../dtos'
import {BrewerType as BrewerTypeEnum} from '../../types'

export class BrewerMapper {
  public static toAttrs(obj: any) {
    const attrs: BrewerAttributes = {
      name: BrewerName.create({value: obj.name}),
      description: obj.description ? BrewerDescription.create({value: obj.descripion}) : undefined,
      type: obj.type ? BrewerType.create({value: obj.type}) : undefined,
    }

    return attrs
  }

  public static toDomain(obj: any) {
    return Brewer.create(BrewerMapper.toAttrs(obj), obj.id ? EntityId.create(obj.id) : undefined)
  }

  public static toDTO(brewer: Brewer): IBrewerDTO {
    return {
      id: brewer.id.toString(),
      name: brewer.name.value,
      description: brewer.description?.value,
      type: (brewer.type?.value as unknown) as BrewerTypeEnum,
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
