import {EntityId} from '@luminate/services-shared'
import {Evaluation} from '../domain/Evaluation'
import {EvaluationDTO} from '../dtos'
import {DateEntity} from '../domain/Date'

export class EvaluationMapper {
  public static toDomain(evaluationDTO: EvaluationDTO) {
    return Evaluation.create(
      {
        date: DateEntity.create({value: evaluationDTO.date}),
      },
      //TODO: I'm not sure if this should check for provided id
      EntityId.create(evaluationDTO.id),
    )
  }

  public static toDTO(evaluation: Evaluation): EvaluationDTO {
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
