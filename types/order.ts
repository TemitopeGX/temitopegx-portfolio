export interface Order {
  id: string
  email: string
  items: OrderItem[]
  total: number
  paymentReference: string
  status: 'pending' | 'completed' | 'failed'
  deliveryMethod: 'download' | 'email' | 'access'
  createdAt: Date
}

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  deliveryDetails: {
    type: 'download' | 'email' | 'access'
    content: string // URL for downloads, credentials for access, or email content
  }
} 