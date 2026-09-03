import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  role?: 'buyer' | 'seller'
}

/**
 * Protège une route : redirige vers /login si non connecté.
 * Si `role` est fourni, vérifie aussi le rôle attendu.
 */
export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { isLoggedIn, loading, role: userRole } = useAuth()

  // Attend la fin du chargement du profil avant de décider
  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}