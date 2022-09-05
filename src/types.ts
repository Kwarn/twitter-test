export interface Image {
  url: string
  width: number
  height: number
}

export interface Url {
  start: number
  end: number
  url: string
  expanded_url: string
  display_url: string
  images: Image[]
  status: number
  title: string
  description: string
  unwound_url: string
  media_key: string
}

export interface Mention {
  start: number
  end: number
  username: string
  id: string
}

export interface Hashtag {
  start: number
  end: number
  tag: string
}

export interface Annotation {
  start: number
  end: number
  probability: number
  type: string
  normalized_text: string
}

export interface Entities {
  urls?: Url[]
  mentions?: Mention[]
  hashtags?: Hashtag[]
  annotations?: Annotation[]
}

export interface ITweet {
  text: string
  entities?: Entities
  author_id: string
  id: string
}
