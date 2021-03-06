import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Evaluation} from '../../domain/Evaluation'
import {EvaluationMapper} from '../../infra/mappers'
import {CreateEvaluationInput, UpdateEvaluationInput} from '../../types'
import {CreateEvaluationCommand, DeleteEvaluationCommand, UpdateEvaluationCommand} from '../commands'
import {GetEvaluationQuery, ListEvaluationsQuery} from '../queries/Evaluation'

@Resolver('Evaluation')
export class EvaluationResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listEvaluations')
  async listEvaluations() {
    const query = new ListEvaluationsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getEvaluation')
  async getEvaluation(@Args('id') id: string) {
    const query = new GetEvaluationQuery(id)
    const evaluation = await this.queryBus.execute<GetEvaluationQuery, Evaluation>(query)

    return EvaluationMapper.toDTO(evaluation)
  }

  @Mutation('createEvaluation')
  async createEvaluation(@Args('input') input: CreateEvaluationInput) {
    const command = new CreateEvaluationCommand(input)
    return this.commandBus.execute(command)
  }

  @Mutation('updateEvaluation')
  async updateEvaluation(@Args('id') id: string, @Args('input') input: UpdateEvaluationInput) {
    const command = new UpdateEvaluationCommand(id, input)
    return this.commandBus.execute(command)
  }

  @Mutation('deleteEvaluation')
  async deleteEvaluation(@Args('id') id: string) {
    const command = new DeleteEvaluationCommand(id)
    return this.commandBus.execute(command)
  }
}
