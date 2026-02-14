import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Solo usa subdirectorio para GitHub Pages, en Vercel usa root
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    // Remover crossorigin que puede causar problemas
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
