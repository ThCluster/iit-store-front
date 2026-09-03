import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getPanier } from '@/services/store'
import { useAuth } from '@/features/auth/AuthContext'

interface CartContextType {
  count: number
  refresh: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const { isLoggedIn } = useAuth()

  function refresh() {
    getPanier()
      .then((panier) => {
        const total = (panier.items ?? []).reduce(
          (sum, item) => sum + item.quantity,
          0,
        )
        setCount(total)
      })
      .catch(() => setCount(0))
  }

  // Rafraîchit au montage et quand l'état de connexion change
  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <CartContext.Provider value={{ count, refresh }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider')
  }
  return context
}