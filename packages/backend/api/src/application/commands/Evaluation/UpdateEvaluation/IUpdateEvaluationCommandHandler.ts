import {ICommandHandler} from '@nestjs/cqrs'
import {UpdateEvaluationCommand} from '.'
import {Evaluation} from '../../../../domain/Evaluation'

export interface IUpdateEvaluationCommandHandler extends ICommandHandler<UpdateEvaluationCommand, Evaluation> {}
