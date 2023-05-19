export interface WikiSave {
  type: string
  category: string
  status: string
  score: number
  favorite: boolean
  creation: Date
  title?: string
  link?: string
  description?: string
  extract?: string
  thumbnail?: string
}
