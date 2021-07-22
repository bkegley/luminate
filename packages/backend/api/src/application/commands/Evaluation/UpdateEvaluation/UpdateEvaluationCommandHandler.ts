import {EventBus} from '@nestjs/cqrs'
import {UpdateEvaluationCommand, IUpdateEvaluationCommandHandler} from '.'
import {EvaluationsRepo} from '../../../../infra/repos'
import {EvaluationMapper} from '../../../../infra/mappers'

export class UpdateEvaluationCommandHandler implements IUpdateEvaluationCommandHandler {
  constructor(private eventBus: EventBus, private evaluationRepo: EvaluationsRepo) {}

  public execute(command: UpdateEvaluationCommand) {
    return new Promise<any>(async (resolve, reject) => {
      const evaluationDoc = await this.evaluationRepo.getById(command.id)

      if (!evaluationDoc) {
        reject('Evaluation does not exist')
        return
      }

      const evaluation = EvaluationMapper.toDomain(evaluationDoc)
      const attrs = EvaluationMapper.toAttrs(command)

      evaluation.update(attrs)

      this.evaluationRepo
        .save(evaluation)
        .then(() => {
          evaluation.events.forEach(event => this.eventBus.publish(event))
          resolve(evaluation)
        })
        .catch(reject)
    })
  }
}
