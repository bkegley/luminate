import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {VarietiesRepo} from '../../../infra/repos'
import {GetVarietyQuery} from './GetVarietyQuery'

@QueryHandler(GetVarietyQuery)
export class GetVarietyQueryHandler implements IQueryHandler<GetVarietyQuery> {
  constructor(private readonly varietiesRepo: VarietiesRepo) {}

  async execute(query: GetVarietyQuery) {
    return this.varietiesRepo.getById(query.id)
  }
}
