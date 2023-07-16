interface Exif {
  make: string
  model: string
  exposure_time: string
  aperture: string
  focal_length: string
  iso: number
}

interface Location {
  name: string
  city: string
  country: string
  position: {
    latitude: number
    longitude: number
  }
}

interface CurrentUserCollections {
  id: number
  title: string
  published_at: string
  last_collected_at: string
  updated_at: string
  cover_photo: any
  user: any
}

interface Urls {
  raw: string
  full: string
  regular: string
  small: string
  small_s3: string
  thumb: string
}

interface Links {
  self: string
  html: string
  download: string
  download_location: string
}

interface User {
  id: string
  updated_at: string
  username: string
  name: string
  portfolio_url: string
  bio: string
  location: string
  total_likes: number
  total_photos: number
  total_collections: number
  instagram_username: string
  twitter_username: string
  profile_image: {
    small: string
    medium: string
    large: string
  }
  links: {
    self: string
    html: string
    photos: string
    likes: string
    portfolio: string
  }
}

export interface ImageResponse {
  id: string
  created_at: string
  updated_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  downloads: number
  likes: number
  liked_by_user: boolean
  alt_description: string
  exif: Exif
  location: Location
  current_user_collections: CurrentUserCollections[]
  urls: Urls
  links: Links
  user: User
  views: number
  tags: {
    type: string
    title: string
  }[]
}
