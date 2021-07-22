import {Entity, EntityId} from '@luminate/ddd'

export interface BrewGuideInstructionsAttributes {
  value: InstructionStep[]
}

export interface InstructionStep {
  note: string
  type?: 'time' | 'water'
}

export class BrewGuideInstructions extends Entity<BrewGuideInstructionsAttributes> {
  private constructor(attrs: BrewGuideInstructionsAttributes, id?: EntityId) {
    super(attrs, id)
  }

  public get value() {
    return this.attrs.value
  }

  public static create(attrs: BrewGuideInstructionsAttributes, id?: EntityId) {
    return new BrewGuideInstructions(attrs, id)
  }
}
