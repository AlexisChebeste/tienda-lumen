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
  stock: number;
}

interface CartContextType {
  items: CartItem[]
  addItem: (
    item: Omit<CartItem, "quantity">,
    totalAdd: number
  ) => { success: boolean; remainingStock: number }
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number 
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: {children: ReactNode}) {
    const [items, setItems] = useState<CartItem[]>([])


    const addItem = (
      item: Omit<CartItem, "quantity">,
      totalAdd: number
    ) => {
      let result = { success: true, remainingStock: 0 };

      setItems((currentItems) => {
        const existingItem = currentItems.find((i) => 
          i.id === item.id && 
          i.size === item.size && 
          i.color === item.color
        )
        const existingQuantity = existingItem?.quantity ?? 0
        const maxAllowed = item.stock
        const remaining = maxAllowed - existingQuantity;

        if(totalAdd > remaining){
          result = {
            success: false,
            remainingStock: remaining,
          };
          return currentItems;
        }

        if(existingItem) {
          return currentItems.map((i) => 
              i.id === item.id && i.size === item.size && i.color === item.color ? 
              {...i, quantity: i.quantity + totalAdd} 
              : i
          )
        }

        return [...currentItems, {...item, quantity: totalAdd}]
      })
      
      return result
    }

    const removeItem = (id: string) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id)
        return
      }
      const currentItem = items.find((i) => i.id === id)
      quantity = Math.min(quantity, currentItem?.stock ?? quantity)

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