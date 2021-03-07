import {Injectable, Scope} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import DataLoader from 'dataloader'
import {Model} from 'mongoose'
import {CoffeeAggregate} from '../../domain/Coffee/Coffee'
import {CoffeeMapper} from '../mappers'
import {CoffeeDocument} from '../models'

@Injectable({scope: Scope.REQUEST})
export class CoffeeLoader {
  constructor(@InjectModel('coffee') private readonly coffeeModel: Model<CoffeeDocument>) {}

  private byCoffeeId = new DataLoader<string, CoffeeAggregate | null>(async ids => {
    const coffees = await this.coffeeModel.find({_id: ids})
    return ids
      .map(id => coffees.find(coffee => coffee._id.toString() === id.toString()) || null)
      .map(coffee => CoffeeMapper.toDomain(coffee))
  })

  private byCoffeeName = new DataLoader<string, CoffeeAggregate | null>(async names => {
    const coffees = await this.coffeeModel.find({name: names})

    return names
      .map(name => coffees.find(coffee => coffee.name === name || null))
      .map(coffee => CoffeeMapper.toDomain(coffee))
  })

  private byVarietyId = new DataLoader<string, CoffeeAggregate[] | null>(async varietyIds => {
    const coffees = await this.coffeeModel.find({varieties: {$in: varietyIds}})

    return varietyIds
      .map(id =>
        coffees.filter(coffee => coffee.varieties.find(innerId => innerId.toString() === id.toString()) || null),
      )
      .map(coffees => coffees.map(coffee => CoffeeMapper.toDomain(coffee)))
  })

  public async getById(id: string) {
    return this.byCoffeeId.load(id)
  }

  public async getByName(name: string) {
    return this.byCoffeeName.load(name)
  }

  public async listByVarietyId(id: string) {
    return this.byVarietyId.load(id)
  }
}
