export interface WikiGet {
  id?: string
  title: string
  wikibase_item?: string
  pageid?: number
  lang?: string
  dir?: string
  revision?: string
  tid?: string
  timestamp?: Date
  description?: string
  extract?: string
  extract_html?: string
  thumbnail?: {
    url: string
    source: string
  }
  content_urls?: {
    desktop: {
      page: string
    }
  }
  originalimage?: {
    source: string
  } 
  key?: string
  type?: string
}
