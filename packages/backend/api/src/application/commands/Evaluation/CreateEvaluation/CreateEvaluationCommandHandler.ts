import {CreateEvaluationCommand, ICreateEvaluationCommandHandler} from '.'
import {EvaluationsRepo} from '../../../../infra/repos'
import {Evaluation} from '../../../../domain/Evaluation'
import {CommandHandler, EventBus} from '@nestjs/cqrs'
import {EvaluationMapper} from '../../../../infra/mappers'

@CommandHandler(CreateEvaluationCommand)
export class CreateEvaluationCommandHandler implements ICreateEvaluationCommandHandler {
  constructor(private eventBus: EventBus, private evaluationRepo: EvaluationsRepo) {}

  public async execute(command: CreateEvaluationCommand) {
    return new Promise<Evaluation>((resolve, reject) => {
      const evaluation = EvaluationMapper.toDomain(command)

      this.evaluationRepo
        .create(command.user, evaluation)
        .then(() => {
          evaluation.events.forEach(event => this.eventBus.publish(event))
          resolve(evaluation)
        })
        .catch(reject)
    })
  }
}
