import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {ICoffeesRepo} from './ICoffeesRepo'
import {CoffeeDocument} from '../models'
import {CoffeeMapper} from '../mappers/CoffeeMapper'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {CoffeeAggregate} from '../../domain/Coffee/Coffee'

@Injectable()
export class CoffeesRepo extends AuthenticatedRepo<CoffeeDocument> implements ICoffeesRepo {
  constructor(@InjectModel('coffee') private coffeeModel: Model<CoffeeDocument>) {
    super(coffeeModel)
  }

  public async getByName(name: string) {
    return this.coffeeModel.findOne({name})
  }

  save(user: Token, coffee: CoffeeAggregate): Promise<void>
  save(coffee: CoffeeAggregate): Promise<void>
  public async save(userOrCoffee: Token | CoffeeAggregate, coffee?: CoffeeAggregate) {
    if (coffee) {
      const {_id, ...coffeeObj} = CoffeeMapper.toPersistence(coffee)
      await this.updateOne(userOrCoffee as Token, {_id}, coffeeObj)
    } else {
      const {_id, ...coffeeObj} = CoffeeMapper.toPersistence(userOrCoffee as CoffeeAggregate)
      await this.updateOne({_id}, coffeeObj)
    }
  }
}
