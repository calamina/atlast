export interface MediaModel {
  id?: number
  title?: string
  url?: string
  extract?: string
  user?: string
  tags?: string[] | null
  categ?: string
  action?: string
  score?: number | null
  thumbnail?: string
  image?: string
  description?: string
  tagstring?: string
  like?: boolean
  attributes?: any
  key?: string
}
