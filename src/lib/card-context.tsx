"use client"

import { getProductImagesAll } from "@/services/product.service";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface CartItem {
  id: string;          // variantId
  productId: string;
  name: string;
  price: number;
  image: string;
  colorId: string;
  colorName: string;
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

    const [productImages, setProductImages] = useState<{ productId: string; colorId: string; url: string }[]>([])

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const images = await getProductImagesAll()
          setProductImages(images)
        }
        catch (error) {
          console.error("Error fetching product images:", error)
        }
      }
      fetchImages()
    }, [])

    // cargar carrito
    useEffect(() => {
      const savedCart = localStorage.getItem("cart")

      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    }, [])

    // guardar carrito
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem = (
      item: Omit<CartItem, "quantity">,
      totalAdd: number
    ) => {
      let result = { success: true, remainingStock: 0 };

      setItems((currentItems) => {
        const existingItem = currentItems.find((i) => 
          i.id === item.id && 
          i.size === item.size && 
          i.colorId === item.colorId
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
              i.id === item.id && i.size === item.size && i.colorId === item.colorId ? 
              {...i,quantity: i.quantity + totalAdd} 
              : i
          )
        }

        const newItem: CartItem = {
          ...item,
          quantity: totalAdd,
        }

        return [...currentItems, newItem]
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