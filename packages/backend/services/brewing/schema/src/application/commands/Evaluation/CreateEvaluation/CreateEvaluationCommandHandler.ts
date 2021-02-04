import {CreateEvaluationCommand, ICreateEvaluationCommandHandler} from '.'
import {InMemoryEvaluationRepository} from '../../../../infra/repositories'
import {Evaluation, EvaluationAttributes} from '../../../../domain/Evaluation'
import {DateEntity} from '../../../../domain/Date'
import {CommandHandler, EventBus} from '@nestjs/cqrs'

@CommandHandler(CreateEvaluationCommand)
export class CreateEvaluationCommandHandler implements ICreateEvaluationCommandHandler {
  constructor(private eventBus: EventBus, private evaluationRepo: InMemoryEvaluationRepository) {}

  public async execute(command: CreateEvaluationCommand) {
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
          evaluation.events.forEach(event => this.eventBus.publish(event))
          resolve(evaluation)
        })
        .catch(reject)
    })
  }
}
