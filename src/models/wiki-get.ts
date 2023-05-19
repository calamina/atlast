export interface WikiGet {
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
    source: string
  }
  content_urls?: {
    desktop: {
      page: string
    }
  }
  key?: string
  type?: string
}
