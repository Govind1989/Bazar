import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/data/mock'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
          set({ 
            items: updatedItems,
            totalItems: get().totalItems + 1,
            totalPrice: get().totalPrice + product.price
          })
        } else {
          set({ 
            items: [...items, { ...product, quantity: 1 }],
            totalItems: get().totalItems + 1,
            totalPrice: get().totalPrice + product.price
          })
        }
      },

      removeItem: (productId) => {
        const items = get().items
        const itemToRemove = items.find((item) => item.id === productId)
        if (!itemToRemove) return

        set({
          items: items.filter((item) => item.id !== productId),
          totalItems: get().totalItems - itemToRemove.quantity,
          totalPrice: get().totalPrice - (itemToRemove.price * itemToRemove.quantity)
        })
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items
        const item = items.find((i) => i.id === productId)
        if (!item) return

        const diff = quantity - item.quantity
        const updatedItems = items.map((i) =>
          i.id === productId ? { ...i, quantity } : i
        )

        set({
          items: updatedItems,
          totalItems: get().totalItems + diff,
          totalPrice: get().totalPrice + (item.price * diff)
        })
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'bazar-cart-storage',
    }
  )
)
