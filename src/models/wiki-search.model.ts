export interface WikiSearchModel {
  id: number
  key: string
  title: string
  excerpt?: string
  matched_title?: string
  anchor?: string
  description?: string
  thumbnail: {
    mimetype: string
    width: number
    height: number
    duration?: number
    url: string
  }
}

export interface WikiList {
  pages: WikiSearchModel[]
}