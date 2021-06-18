export interface CuppingSessionDTO {
  id: string
  internalId?: string
  description?: string
  locked?: boolean
  // TODO: fix this
  sessionCoffees?: any[]
  createdAt?: string
  updatedAt?: string
}
