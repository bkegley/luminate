import {EntityId} from '@luminate/ddd'
import {Evaluation, EvaluationAttributes} from '../../domain/Evaluation'
import {IEvaluationDTO} from '../dtos'
import {DateEntity} from '../../domain/Date'

export class EvaluationMapper {
  public static toAttrs(obj: any): EvaluationAttributes {
    return {
      date: obj.date ? DateEntity.create({value: obj.data}) : undefined,
    }
  }

  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    const attrs = EvaluationMapper.toAttrs(obj)

    return Evaluation.create(attrs, EntityId.create(id))
  }

  public static toDTO(evaluation: Evaluation): IEvaluationDTO {
    return {
      id: evaluation.id.toString(),
      date: evaluation.date?.value,
    }
  }

  public static toPersistence(evaluation: Evaluation): any {
    return {
      id: evaluation.id.toString(),
      date: evaluation.date?.value,
    }
  }
}
