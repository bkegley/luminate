import {EventBus} from '@nestjs/cqrs'
import {DeleteEvaluationCommand, IDeleteEvaluationCommandHandler} from '.'
import {EvaluationsRepo} from '../../../../infra/repos'
import {Evaluation} from '../../../../domain/Evaluation'
import {EvaluationMapper} from '../../../../infra/mappers'

export class DeleteEvaluationCommandHandler implements IDeleteEvaluationCommandHandler {
  constructor(private eventBus: EventBus, private evaluationRepo: EvaluationsRepo) {}

  public execute(command: DeleteEvaluationCommand) {
    return new Promise<Evaluation>(async (resolve, reject) => {
      const evaluationDoc = await this.evaluationRepo.getById(command.user, command.id)

      if (!evaluationDoc) {
        reject('Evaluation does not exist')
        return
      }

      const evaluation = EvaluationMapper.toDomain(evaluationDoc)
      evaluation.delete()

      this.evaluationRepo
        .delete(command.user, evaluation.id)
        .then(() => {
          evaluation.events.forEach(event => this.eventBus.publish(event))
          resolve(evaluation)
        })
        .catch(reject)
    })
  }
}
