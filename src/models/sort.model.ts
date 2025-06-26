export type SortNameModel = 'date' | 'title' | 'score' | null

export interface SortModel {
  name: SortNameModel
  title: string
}