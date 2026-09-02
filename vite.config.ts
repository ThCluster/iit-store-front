import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Endpoints boutique (client)
      '/store': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      // Endpoints vendeur
      '/vendor': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      // Authentification DRF (session)
      '/api-auth': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
