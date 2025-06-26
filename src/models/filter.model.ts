import type { StatusNameModel } from "./status.model"
import type { CategNameModel } from "./categ.model"
import type { SortNameModel } from "./sort.model"

export interface FilterModel {
  [key: string]: any
  sort: SortNameModel
  order: 'asc' | 'desc'
  categ?: CategNameModel
  status?: StatusNameModel
  like?: boolean | null
}
