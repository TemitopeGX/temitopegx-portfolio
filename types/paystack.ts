export interface PaystackResponse {
  reference: string
  status: 'success' | 'failed'
  trans: string
  transaction: string
  message: string
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void }
    }
  }
}

export interface PaystackConfig {
  key: string
  email: string
  amount: number
  currency: string
  ref: string
  callback: (response: PaystackResponse) => void
  onClose: () => void
} 