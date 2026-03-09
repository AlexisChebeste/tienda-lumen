import { CartItem } from "@/lib/card-context"

export type Telefono = {
    codigo_pais: string
    numero: string
    codigo_area: string
}

export type Direccion = {
    calle: string
    numero: string
    provincia: string
    codigo_postal: string
}

export type Order = {
    id: string
    items: CartItem[]
    subtotal: number
    shipping: {
        method: "standard" | "express"
        price: number
    }
    total: number

    customer: {
        nombre: string
        email: string
        telefono: Telefono
    }

    direccion: Direccion

    payment: {
        method: "card"
        status: "pending" | "paid" | "failed"
    }

    status: "pending" | "processing" | "shipped" | "delivered"

    createdAt: Date
}

export type CreateOrder = Omit<Order, "id" | "createdAt" | "status">