export interface LinkModel {
  id?: number
  url?: string
  title?: string
  description?: string
  user?: string
  tags?: string[] | null
  tagstring?: string
  category?: string
  like?: boolean
  date?: Date
  favicon?: string
  attributes?: any
}
