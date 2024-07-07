import { ORDER_STATUS } from "./order.constant"

export type TOrder = {
    _id: string
    orderId: string
    userEmail: string
    products: TProductItem[]
    totalQuantity: number
    totalAmount: number
    orderStatus: TOrderStatus
    shippingAddress: TShippingAddress
    paymentInfo: TPaymentInfo
}

export type TOrderStatus = keyof typeof ORDER_STATUS

export type TProductItem = {
    productId: string
    productName: string
    quantity: number
    price: number
}

export type TShippingAddress = {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
}

export type TPaymentInfo = {
    method: string
}
