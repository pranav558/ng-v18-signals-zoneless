export interface Item {
  id: number
  title: string
  price: number
  description?: string
  category?: string
  image?: string
  rating?: Rating
}

export interface Rating {
  rate: number
  count: number
}

export interface CartItem {
  detail: Item
  quantity: number
}
