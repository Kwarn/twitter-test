/* eslint-disable camelcase */
export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface IUrl {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
  images: Image[];
  status: number;
  title: string;
  description: string;
  unwound_url: string;
  media_key: string;
}

export interface IMention {
  start: number;
  end: number;
  username: string;
  id: string;
}

export interface IHashtag {
  start: number;
  end: number;
  tag: string;
}

export interface IAnnotation {
  start: number;
  end: number;
  probability: number;
  type: string;
  normalized_text: string;
}

export interface IEntities {
  urls?: IUrl[];
  mentions?: IMention[];
  hashtags?: IHashtag[];
  annotations?: IAnnotation[];
}

export interface ITweet {
  text: string;
  created_at: string;
  entities?: IEntities;
  author_id: string;
  id: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
}

export interface IIncludes {
  users: IUser[];
}

export interface IMeta {
  newest_id: string;
  oldest_id: string;
  result_count: number;
  next_token: string;
}

export interface ITwitterData {
  data?: ITweet[];
  includes?: IIncludes;
  meta?: IMeta;
}
