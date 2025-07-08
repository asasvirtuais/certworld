'use client'

import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react'

interface CartItem extends Course {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (course: Course) => void
  removeItem: (id: string) => void
  clearCart: () => void
  toggleDrawer: () => void
  getTotalPrice: () => number
  getItemCount: () => number
  isInCart: (id: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (course: Course) => {
    setItems(current => {
      const existing = current.find(item => item.id === course.id)
      if (existing) {
        return current
      }
      return [...current, { ...course, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const toggleDrawer = () => {
    setIsOpen(prev => !prev)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.Price * item.quantity), 0)
  }

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const isInCart = (id: string) => {
    return items.some(item => item.id === id)
  }

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      addItem,
      removeItem,
      clearCart,
      toggleDrawer,
      getTotalPrice,
      getItemCount,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}