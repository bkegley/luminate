import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Evaluation} from '../../domain/Evaluation'
import {EvaluationMapper} from '../../infra/mappers'
import {CreateEvaluationInput, UpdateEvaluationInput} from '../../types'
import {CreateEvaluationCommand, DeleteEvaluationCommand, UpdateEvaluationCommand} from '../commands'
import {GetEvaluationQuery, ListEvaluationsQuery} from '../queries/Evaluation'
import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {AuthGuard} from '../guards'

@Resolver('Evaluation')
@UseGuards(AuthGuard)
export class EvaluationResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listEvaluations')
  async listEvaluations(@Context('user') user: Token) {
    const query = new ListEvaluationsQuery(user)
    return this.queryBus.execute(query)
  }

  @Query('getEvaluation')
  async getEvaluation(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetEvaluationQuery(user, id)
    const evaluation = await this.queryBus.execute<GetEvaluationQuery, Evaluation>(query)

    return EvaluationMapper.toDTO(evaluation)
  }

  @Mutation('createEvaluation')
  async createEvaluation(@Args('input') input: CreateEvaluationInput, @Context('user') user: Token) {
    const command = new CreateEvaluationCommand(user, input)
    return this.commandBus.execute(command)
  }

  @Mutation('updateEvaluation')
  async updateEvaluation(
    @Args('id') id: string,
    @Args('input') input: UpdateEvaluationInput,
    @Context('user') user: Token,
  ) {
    const command = new UpdateEvaluationCommand(user, id, input)
    return this.commandBus.execute(command)
  }

  @Mutation('deleteEvaluation')
  async deleteEvaluation(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteEvaluationCommand(user, id)
    return this.commandBus.execute(command)
  }
}
