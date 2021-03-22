import {BaseService} from '@luminate/mongo-utils'
import {Injectable} from '@nestjs/common'
import {CoffeeAggregate} from '../../domain/Coffee/Coffee'
import {CoffeeMapper} from '../mappers'
import {CoffeesRepo} from '../repos'

@Injectable()
export class CoffeeService extends BaseService<CoffeeAggregate> {
  constructor(readonly repo: CoffeesRepo) {
    super(repo)
  }

  public async getById(id: string) {
    const coffee = await this.repo.getById(id)

    return CoffeeMapper.toDomain(coffee)
  }

  public async create(input: any) {
    const coffee = await this.repo.create(input)

    return CoffeeMapper.toDomain(coffee)
  }

  public async updateOne(conditions: any, input: any) {
    const coffee = await this.repo.updateOne(conditions, input)

    return CoffeeMapper.toDomain(coffee)
  }

  public async updateById(id: string, input: any) {
    const coffee = await this.repo.updateById(id, input)

    return CoffeeMapper.toDomain(coffee)
  }

  public async deleteById(id: string) {
    const coffee = await this.repo.delete(id)

    return CoffeeMapper.toDomain(coffee)
  }
}
