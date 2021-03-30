export interface IPostDTO {
  id: string
  title: string
  content: string
  relations?: {type: string; id: string}[]
  createdAt: string
  updatedAt: string
}
