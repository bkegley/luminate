import {CreateEvaluationCommand} from './CreateEvaluationCommand'
import {ICommandHandler} from '../ICommandHandler'
import {IEventRegistry} from '../../infra'
import {IEvaluationRepository} from '../../repositories'
import {Evaluation, EvaluationAttributes} from '../../domain/Evaluation'
import {DateEntity} from '../../domain/Date'

export class CreateEvaluationCommandHandler implements ICommandHandler<CreateEvaluationCommand, Evaluation> {
  constructor(private eventRegistry: IEventRegistry, private evaluationRepo: IEvaluationRepository) {}

  public async handle(command: CreateEvaluationCommand) {
    return new Promise<Evaluation>((resolve, reject) => {
      const evaluationArgs: EvaluationAttributes = {}

      if (command.date) {
        const date = DateEntity.create({value: command.date})
        evaluationArgs.date = date
      }

      const evaluation = Evaluation.create(evaluationArgs)

      this.evaluationRepo
        .save(evaluation)
        .then(() => {
          this.eventRegistry.markAggregateForPublish(evaluation)
          this.eventRegistry.publishEvents()
          resolve(evaluation)
        })
        .catch(reject)
    })
  }
}
