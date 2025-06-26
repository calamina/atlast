import type { CategNameModel } from "./categ.model"
import type { StatusNameModel } from "./status.model"

export interface MediaModel {
  id?: number
  title?: string
  url?: string
  extract?: string
  user?: string
  tags?: string[] | null
  categ?: CategNameModel
  status?: StatusNameModel
  score?: number
  thumbnail?: string | any
  image?: string
  description?: string
  tagstring?: string
  like?: boolean
  attributes?: any
  key?: string
  createdAt?: Date
  updatedAt?: Date
}