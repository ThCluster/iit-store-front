import api from './api'

export interface LoginResponse {
  access: string
  refresh: string
}

export interface Profil {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  telephone: string
  photo: string | null
}

export const login = async (email: string, password: string) => {
  const { data } = await api.post<LoginResponse>('/api/token/', { email, password })
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
  return data
}

export const register = async (payload: {
  username: string
  email: string
  password: string
  password_confirmation: string
  first_name?: string
  last_name?: string
  telephone?: string
  role?: string
}) => {
  const { data } = await api.post('/customer/api/inscription/', payload)
  return data
}

export const getProfil = async () => {
  const { data } = await api.get<Profil>('/customer/api/profil/')
  return data
}

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  window.location.href = '/login'
}