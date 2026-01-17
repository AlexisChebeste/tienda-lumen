"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CartItem {
  id: string;          // variantId
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  sku: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, totalAdd: number) => void  
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number 
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: {children: ReactNode}) {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (item: Omit<CartItem, "quantity">, totalAdd: number) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((i) => i.id === item.id && i.size === item.size && i.color === item.color)

            if(existingItem) {
                return currentItems.map((i) => 
                    i.id === item.id && i.size === item.size && i.color === item.color ? {...i, quantity: i.quantity + totalAdd} : i
                )
            }

            return [...currentItems, {...item, quantity: totalAdd}]
        })
    }

    const removeItem = (id: string) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id)
        return
      }

      setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }

    const clearCart = () => {
      setItems([])
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice}}
        >
        {children}
        </CartContext.Provider>
    )

}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}