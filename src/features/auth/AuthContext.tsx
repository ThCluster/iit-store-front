import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getProfil, type Profil } from '@/services/auth'
import { fusionnerPanier } from '@/services/store'

type Role = 'buyer' | 'seller'

interface AuthContextType {
  isLoggedIn: boolean
  loading: boolean
  role: Role
  profil: Profil | null
  login: (role: Role) => void
  loginWithProfile: (profil: Profil) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<Role>('buyer')
  const [profil, setProfil] = useState<Profil | null>(null)

  // Au démarrage, si un token existe, on charge le profil réel
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      getProfil()
        .then((p) => {
          setProfil(p)
          setRole(p.role === 'vendeur' ? 'seller' : 'buyer')
          setIsLoggedIn(true)
          // Fusionne un éventuel panier de session resté anonyme
          fusionnerPanier().catch(() => {
            /* silencieux */
          })
        })
        .catch(() => {
          setProfil(null)
          setIsLoggedIn(false)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  function login(userRole: Role) {
    setRole(userRole)
    setIsLoggedIn(true)
  }

  function loginWithProfile(p: Profil) {
    setProfil(p)
    setRole((p.role === 'vendeur' ? 'seller' : 'buyer') as Role)
    setIsLoggedIn(true)
    setLoading(false)
    // Fusionne le panier anonyme (session) dans le panier du profil
    fusionnerPanier().catch(() => {
      /* silencieux : pas de panier à fusionner */
    })
  }

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setProfil(null)
    setIsLoggedIn(false)
    setRole('buyer')
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, role, profil, login, loginWithProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}