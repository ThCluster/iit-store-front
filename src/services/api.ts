import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Intercepteur : ajoute le token Bearer + la clé de session à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // Clé de session persistante pour le panier anonyme
  let sessionKey = sessionStorage.getItem('session_key')
  if (!sessionKey) {
    sessionKey = `sess_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
    sessionStorage.setItem('session_key', sessionKey)
  }
  config.headers['X-Session-Key'] = sessionKey
  return config
})

// Intercepteur : rafraîchit le token si 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const { data } = await axios.post(
            'http://127.0.0.1:8000/api/token/refresh/',
            { refresh },
          )
          localStorage.setItem('access_token', data.access)
          originalRequest.headers.Authorization = `Bearer ${data.access}`
          return api(originalRequest)
        } catch {
          localStorage.clear()
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  },
)

export default api