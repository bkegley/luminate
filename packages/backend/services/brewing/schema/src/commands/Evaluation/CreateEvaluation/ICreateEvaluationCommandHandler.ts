import {ICommandHandler} from '../..'
import {CreateEvaluationCommand} from '.'
import {Evaluation} from '../../../domain/Evaluation'

export interface ICreateEvaluationCommandHandler extends ICommandHandler<CreateEvaluationCommand, Evaluation> {}
