import {ICommandHandler} from '../..'
import {DeleteEvaluationCommand} from '.'
import {Evaluation} from '../../../../domain/Evaluation'

export interface IDeleteEvaluationCommandHandler extends ICommandHandler<DeleteEvaluationCommand, Evaluation> {}
