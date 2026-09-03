import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getFavoris } from '@/services/favoris'
import { useAuth } from '@/features/auth/AuthContext'

interface FavorisContextType {
  count: number
  refresh: () => void
}

const FavorisContext = createContext<FavorisContextType | undefined>(undefined)

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const { isLoggedIn } = useAuth()

  function refresh() {
    if (!isLoggedIn) {
      setCount(0)
      return
    }
    getFavoris()
      .then((favoris) => setCount(favoris.length))
      .catch(() => setCount(0))
  }

  // Rafraîchit au montage et quand l'état de connexion change
  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <FavorisContext.Provider value={{ count, refresh }}>
      {children}
    </FavorisContext.Provider>
  )
}

export function useFavoris() {
  const context = useContext(FavorisContext)
  if (!context) {
    throw new Error('useFavoris doit être utilisé dans un FavorisProvider')
  }
  return context
}