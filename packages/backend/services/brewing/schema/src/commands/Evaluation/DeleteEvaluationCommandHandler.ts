import {ICommandHandler} from '../ICommandHandler'
import {DeleteEvaluationCommand} from './DeleteEvaluationCommand'
import {IEventRegistry} from '../../infra'
import {IEvaluationRepository} from '../../repositories'

export class DeleteEvaluationCommandHandler implements ICommandHandler<DeleteEvaluationCommand, boolean> {
  constructor(private eventRegistry: IEventRegistry, private evaluationRepo: IEvaluationRepository) {}
  handle(command: DeleteEvaluationCommand) {
    return new Promise<boolean>(async (resolve, reject) => {
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
          resolve(true)
        })
        .catch(reject)
    })
  }
}
