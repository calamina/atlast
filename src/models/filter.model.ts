export interface FilterModel {
  [key: string]: any
  sort: 'date' | 'title' | 'score'
  order: 'asc' | 'desc'
  categ?: 'movie' | 'series' | 'book' | 'comic' | 'game' | null
  status?: 'completed' | 'planning' | 'ongoing' | 'dropped' | null
  like?: boolean | null
}
