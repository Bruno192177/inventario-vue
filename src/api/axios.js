import axios from 'axios'
import router from '../router'

// Crear instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

// Interceptor de respuesta
api.interceptors.response.use(
  res => res, // Si todo salió bien, regresamos la respuesta

  async err => {
    if (!err.config) return Promise.reject(err)

    const originalRequest = err.config
    const STATUS = err?.response?.status

    // Endpoints que NO deben ser interceptados
    const authRoutes = ['/auth/login', '/auth/register']
    if (authRoutes.some(r => originalRequest.url.includes(r))) {
      return Promise.reject(err)
    }

    // Caso: ya intentamos el refresh token → cerrar sesión
    if (STATUS === 401 && originalRequest._retry) {
      localStorage.removeItem(import.meta.env.VITE_KEY_STORAGE)

      try { await api.post('/auth/logout') } catch (_) {}

      router.push('/')
      return Promise.reject(err)
    }

    // Caso: access token expiró, primer intento
    if (STATUS === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshRes = await api.post('/auth/refresh')

        if (refreshRes.status === 200) {
          return api(originalRequest) // Reintentar la petición original
        }

        throw new Error('Refresh failed')

      } catch (error) {
        // Si también falló el refresh → cerrar sesión
        localStorage.removeItem(import.meta.env.VITE_KEY_STORAGE)
        try { await api.post('/auth/logout') } catch (_) {}

        router.push('/')
        return Promise.reject(err)
      }
    }

    return Promise.reject(err)
  }
)

export default api
