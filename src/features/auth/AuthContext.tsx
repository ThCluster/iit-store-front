import { createContext, useContext, useState, type ReactNode } from 'react'

type Role = 'buyer' | 'seller'

interface AuthContextType {
  isLoggedIn: boolean
  role: Role
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState<Role>('buyer')

  function login(userRole: Role) {
    setRole(userRole)
    setIsLoggedIn(true)
  }

  function logout() {
    setIsLoggedIn(false)
    setRole('buyer')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
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