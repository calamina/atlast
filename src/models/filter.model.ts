export interface FilterModel {
  [key: string]: any
  sort: string
  categ?: string | null
  action?: string | null
  like?: boolean | null
}
