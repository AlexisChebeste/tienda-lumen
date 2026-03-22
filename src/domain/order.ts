import { UUID } from "crypto"


export interface OrderItem {
  id: string
  productId: string
  variantId: string
  productName: string
  sku: string
  color: string
  size: string
  price: number
  quantity: number
  image: string
}

export interface OrderAddress {
  id: string
  street: string
  number: string
  province: string
  postal_code: string
}

export interface Order {
  id: string
  orderNumber: number
  createdAt: string

  customerName: string
  customerEmail: string
  customerPhone: string

  status: string
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod

  subtotal: number
  shippingMethod: string
  shippingTotal: number
  total: number

  address: OrderAddress[] | null
  items: OrderItem[]
}

export interface GetOrdersResponse {
  data: Order[]
  total: number
  page: number
  limit: number
}

export type OrderStatus = 
  | "pending"
  | "paid"
  | "shipped"
  | "cancelled"

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"

export type PaymentMethod =
  | "card"
  | "cash"
  | "transfer"


export interface OrderView {
  id: UUID
  order_number: number
  created_at: string

  customer_name: string
  customer_email: string
  customer_phone: string

  status: string
  payment_status: PaymentStatus
  payment_method: PaymentMethod

  subtotal: number
  shipping_method: string
  shipping_total: number
  total: number

  order_addresses: OrderAddress[]
  order_items: orderItemsComplete[]
}

export interface orderItemsComplete {
  id: string
  product_id: string
  variant_id: string
  product_name: string
  order_id: string
  sku: string
  color_name: string
  size: string
  price: number
  quantity: number
  image: string
}
