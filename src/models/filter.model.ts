import type { StatusNameModel } from "./status.model"
import type { CategNameModel } from "./categ.model"
import type { SortNameModel } from "./sort.model"

export interface FilterModel {
  sort: SortNameModel
  order: 'asc' | 'desc'
  tag?: string | null
  categ?: CategNameModel
  status?: StatusNameModel
  like?: boolean | null
}
