import {EntityId} from '@luminate/ddd'
import {Grinder, GrinderAttributes} from '../../domain/Grinder'
import {GrinderName} from '../../domain/Grinder/GrinderName'
import {IGrinderDTO} from '../dtos'
import {GrinderDescription} from '../../domain/Grinder/GrinderDescription'
import {GrinderBurrSet} from '../../domain/Grinder/GrinderBurrSet'
import {BurrSet} from '../../types'

export class GrinderMapper {
  public static toAttrs(obj: any): GrinderAttributes {
    return {
      name: GrinderName.create({value: obj.name}),
      description: obj.description ? GrinderDescription.create({value: obj.description}) : null,
      burrSet: obj.burrSet ? GrinderBurrSet.create({value: obj.burrSet}) : null,
    }
  }
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = GrinderMapper.toAttrs(obj)

    return Grinder.create(attrs, EntityId.create(id))
  }

  public static toDTO(grinder: Grinder): IGrinderDTO {
    return {
      id: grinder.id.toString(),
      name: grinder.name.value,
      description: grinder.description?.value,
      burrSet: (grinder.burrSet?.value as unknown) as BurrSet,
    }
  }

  public static toPersistence(grinder: Grinder): any {
    return {
      id: grinder.id.toString(),
      name: grinder.name?.value,
      description: grinder.description?.value,
      burrSet: grinder.burrSet?.value,
    }
  }
}
