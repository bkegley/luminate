import {Entity} from '@luminate/ddd'

export interface WaterTemperatureAttributes {
  temperature: number
  unit: 'c' | 'f'
}

export class WaterTemperature extends Entity<WaterTemperatureAttributes> {
  public static create(attrs: WaterTemperatureAttributes) {
    return new WaterTemperature(attrs)
  }
}
