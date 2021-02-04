import {DeleteEvaluationCommand, IDeleteEvaluationCommandHandler} from '.'
import {IEventRegistry} from '../../../../infra'
import {IEvaluationRepository} from '../../../../infra/repositories'
import {Evaluation} from '../../../../domain/Evaluation'

export class DeleteEvaluationCommandHandler implements IDeleteEvaluationCommandHandler {
  constructor(private eventRegistry: IEventRegistry, private evaluationRepo: IEvaluationRepository) {}
  handle(command: DeleteEvaluationCommand) {
    return new Promise<Evaluation>(async (resolve, reject) => {
      const evaluation = await this.evaluationRepo.getById(command.id)

      if (!evaluation) {
        reject('Evaluation does not exist')
        return
      }

      evaluation.delete()

      this.evaluationRepo
        .delete(evaluation.id)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(evaluation)
          this.eventRegistry.publishEvents()
          resolve(evaluation)
        })
        .catch(reject)
    })
  }
}
