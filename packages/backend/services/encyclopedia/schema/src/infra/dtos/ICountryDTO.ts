export interface ICountryDTO {
  id: string
  name: string
  nameEn?: string
  sovereignId?: string
  population?: {
    estimate: number
    rank: number
    year: number
  }
  geography?: {
    region: string
    subRegion: string
    subUnit: string
    sovereignNation: string
  }
}
