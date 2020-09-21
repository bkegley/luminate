import {CreateBrewerInput} from '../types'

export class CreateBrewerCommand {
  name: string

  constructor(input: CreateBrewerInput) {
    this.name = input.name
  }
}
