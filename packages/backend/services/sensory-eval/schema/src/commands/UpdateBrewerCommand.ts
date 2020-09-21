import {UpdateBrewerInput} from '../types'

export class UpdateBrewerCommand {
  id: string
  name: string

  constructor(id: string, input: UpdateBrewerInput) {
    this.id = id
    this.name = input.name
  }
}
