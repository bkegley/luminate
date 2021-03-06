import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {ICoffeesRepo} from './ICoffeesRepo'
import {CoffeeDocument} from '../models'
import {CoffeeMapper} from '../mappers/CoffeeMapper'
import {CoffeeAggregate} from '../../domain/Coffee/Coffee'

@Injectable()
export class CoffeesRepo implements ICoffeesRepo {
  constructor(@InjectModel('coffee') private coffeeModel: Model<CoffeeDocument>) {}

  public async list(conditions?: any) {
    const coffees = await this.coffeeModel.find(conditions)
    if (!coffees) {
      return null
    }

    return coffees.map(coffee => CoffeeMapper.toDomain(coffee))
  }

  public async getById(id: string) {
    const coffee = await this.coffeeModel.findById(id)
    if (!coffee) {
      return null
    }

    return CoffeeMapper.toDomain(coffee)
  }

  public async getByName(name: string) {
    const coffee = await this.coffeeModel.findOne({name})
    if (!coffee) {
      return null
    }

    return CoffeeMapper.toDomain(coffee)
  }

  public async save(coffee: CoffeeAggregate) {
    const {id, ...coffeeObj} = CoffeeMapper.toPersistence(coffee)
    await this.coffeeModel.updateOne({_id: id}, coffeeObj, {upsert: true})
  }

  public async delete(id: string) {
    await this.coffeeModel.deleteOne({_id: id})
  }
}
