import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {IEvaluationsRepo} from './IEvaluationRepo'
import {EvaluationDocument} from '../../models'
import {EvaluationMapper} from '../../mappers/EvaluationMapper'
import {Evaluation} from '../../../domain/evaluation'

@Injectable()
export class EvaluationsRepo extends AuthenticatedRepo<EvaluationDocument> implements IEvaluationsRepo {
  constructor(@InjectModel('evaluation') protected evaluationModel: Model<EvaluationDocument>) {
    super(evaluationModel)
  }

  save(user: Token, evaluation: Evaluation): Promise<void>
  save(evaluation: Evaluation): Promise<void>
  public async save(userOrEvaluation: Token | Evaluation, evaluation?: Evaluation) {
    if (evaluation) {
      const {id, ...evaluationObj} = EvaluationMapper.toPersistence(evaluation)
      await this.updateOne(userOrEvaluation as Token, {_id: id}, evaluationObj)
    } else {
      const {id, ...evaluationObj} = EvaluationMapper.toPersistence(userOrEvaluation as Evaluation)
      await this.updateOne({_id: id}, evaluationObj)
    }
  }
}
