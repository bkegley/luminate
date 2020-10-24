import {CreateBrewerInput} from '../../types'
import {BrewerName} from '../../domain/Brewer/BrewerName'
import {BrewerDescription} from '../../domain/Brewer/BrewerDescription'
import {BrewerType, BrewerTypeEnum} from '../../domain/Brewer/BrewerType'

export class CreateBrewerCommand {
  name: BrewerName
  description: BrewerDescription
  type: BrewerType

  constructor(input: CreateBrewerInput) {
    if (input.name) {
      this.name = BrewerName.create({value: input.name})
    }
    if (input.description) {
      this.description = BrewerDescription.create({value: input.description})
    }
    if (input.type) {
      this.type = BrewerType.create({value: (input.type as unknown) as BrewerTypeEnum})
    }
  }
}
