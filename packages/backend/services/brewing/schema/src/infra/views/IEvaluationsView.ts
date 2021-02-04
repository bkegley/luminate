import {EvaluationConnection, Evaluation} from '../../types'

export interface IEvaluationsView {
  listEvaluations(): Promise<EvaluationConnection>
  getEvaluation(id: string): Promise<Evaluation>
}
