import {ValueObject} from '@luminate/ddd'

export interface CountryGeographyAttributes {
  region: string
  subRegion: string
  subUnit: string
  sovereignNation: string
}

export class CountryGeography extends ValueObject<CountryGeographyAttributes> {
  public get region() {
    return this.attrs.region
  }

  public get subRegion() {
    return this.attrs.subRegion
  }

  public get subUnit() {
    return this.attrs.subUnit
  }

  public get sovereignNation() {
    return this.attrs.sovereignNation
  }

  public static create(attrs: CountryGeographyAttributes) {
    return new CountryGeography(attrs)
  }
}
