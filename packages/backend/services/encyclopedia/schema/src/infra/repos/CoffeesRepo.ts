import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {ICoffeesRepo} from './ICoffeesRepo'
import {CoffeeDocument} from '../models'
import {CoffeeMapper} from '../mappers/CoffeeMapper'
import {BaseRepo} from '@luminate/mongo-utils'
import {CoffeeAggregate} from '../../domain/Coffee/Coffee'

@Injectable()
export class CoffeesRepo extends BaseRepo<CoffeeDocument> implements ICoffeesRepo {
  constructor(@InjectModel('coffee') private coffeeModel: Model<CoffeeDocument>) {
    super(coffeeModel)
  }

  public async getByName(name: string) {
    return this.coffeeModel.findOne({name})
  }

  public async save(coffee: CoffeeAggregate) {
    const {id, ...coffeeObj} = CoffeeMapper.toPersistence(coffee)
    await this.coffeeModel.updateOne({_id: id}, coffeeObj, {upsert: true})
  }
}
