import {BaseService} from '@luminate/mongo-utils'
import {Injectable} from '@nestjs/common'
import {QueryFindOneAndUpdateOptions} from 'mongoose'
import {CountryAggregate} from '../../domain/Country/Country'
import {CountryMapper} from '../mappers'
import {CountriesRepo} from '../repos'

@Injectable()
export class CountryService extends BaseService<CountryAggregate> {
  constructor(readonly repo: CountriesRepo) {
    super(repo)
  }

  public async getById(id: string) {
    const country = await this.repo.getById(id)

    return CountryMapper.toDomain(country)
  }

  public async create(input: any) {
    const country = await this.repo.create(input)

    return CountryMapper.toDomain(country)
  }

  public async updateOne(conditions: any, input: any, options?: QueryFindOneAndUpdateOptions) {
    const country = await this.repo.updateOne(conditions, input, options)

    return CountryMapper.toDomain(country)
  }

  public async updateById(id: string, input: any, options?: QueryFindOneAndUpdateOptions) {
    const country = await this.repo.updateById(id, input, options)

    return CountryMapper.toDomain(country)
  }

  public async deleteById(id: string) {
    const country = await this.repo.delete(id)

    return CountryMapper.toDomain(country)
  }
}
