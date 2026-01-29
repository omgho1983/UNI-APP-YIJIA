// yijia-base 项目类型定义

export interface Institution {
  id: string
  name: string
  brandName?: string // Brand association
  image: string
  priceRange: [number, number]
  location: string
  distance?: string
  rating: number
  tags: string[]
  careTypes: string[]
  features: string[]
  description: string
  isVR: boolean
  isLive: boolean
  originalPrice?: number // Added for special offers
  offerDeadline?: string // Added for countdowns
}

export interface Contract {
  id: string
  title: string
  inst: string
  date: string
  status: '待签署' | '已签署' | '签署中'
  color: string
  bg: string
}

export type ViewType =
  | 'ONBOARDING'
  | 'LOGIN'
  | 'REGISTER'
  | 'HOME'
  | 'SEARCH'
  | 'DETAIL'
  | 'TOOLS'
  | 'SIGNING'
  | 'MESSAGES'
  | 'PROFILE'
  | 'SETTINGS'
  | 'MAP_SEARCH'
  | 'VR_LIST'
  | 'VR_PLAYER'
  | 'LIVE_LIST'
  | 'LIVE_PLAYER'
  | 'OFFER_LIST'
  | 'PRICE_CALCULATOR'
  | 'COMPARISON'
  | 'CHECKLIST'
  | 'POLICY'
  | 'RELOCATION'
  | 'COLLECTION'
  | 'HISTORY'
  | 'MY_REVIEWS'
  | 'FOLLOWING'
  | 'BOOKING_LIST'
  | 'ONLINE_CONTRACT'
  | 'PAYMENT_RECORDS'
  | 'HEALTH_ARCHIVE'
  | 'MY_COMPLAINTS'
  | 'CONTRACT_DETAIL'
  | 'CHAT'
  | 'BRAND_DETAIL'
  | 'SURROUNDINGS_MAP'
  | 'CARE_SERVICES'
  | 'ONLINE_BOOKING'
  | 'AI_RESULTS'
  | 'BOOKING_FORM'

export interface Booking {
  id: string
  institutionName: string
  date: string
  status: '待确认' | '待参观' | '已完成' | '已取消'
}
