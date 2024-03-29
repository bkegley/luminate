import {Entity} from '@luminate/ddd'

export interface GrinderGrindSettingAttributes {
  value: number
}

export class GrinderGrindSetting extends Entity<GrinderGrindSettingAttributes> {
  get value() {
    return this.attrs.value
  }

  public static create(attrs: GrinderGrindSettingAttributes) {
    return new GrinderGrindSetting(attrs)
  }
}
