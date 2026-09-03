import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { AuthProvider } from '@/features/auth/AuthContext'
import { CartProvider } from '@/features/cart/CartContext'
import { FavorisProvider } from '@/features/favoris/FavorisContext'

const queryClient = new QueryClient()

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <FavorisProvider>{children}</FavorisProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}