import {CreateBrewerInput} from '../types'
import {BrewerName} from '../domain/BrewerName'

export class CreateBrewerCommand {
  name: BrewerName

  constructor(input: CreateBrewerInput) {
    this.name = BrewerName.create({value: input.name})
  }
}
