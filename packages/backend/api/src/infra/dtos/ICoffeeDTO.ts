export interface ICoffeeDTO {
  id: string
  name: string
  country?: string
  region?: string
  farm?: string
  farmZone?: string
  varieties?: string[]
  elevation?: number
  components?: Array<{coffee: string; percentage: number}>
  createdAt: string
  updatedAt: string
}
