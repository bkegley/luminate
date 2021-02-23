import {CoffeeAggregate} from '../../domain/Coffee/Coffee'
import {IRepo} from './IRepo'

export interface ICoffeesRepo extends IRepo<CoffeeAggregate> {}
