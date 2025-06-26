export interface FilterModel {
  [key: string]: any
  sort: string
  order: string
  categ?: string | null
  status?: string | null
  like?: boolean | null
}
