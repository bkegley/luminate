export interface RecipeDTO {
  id?: string
  name: string
  brewerId: string
  grinderId: string
  grindSetting?: number
  instructions?: string[]
}
