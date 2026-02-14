import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Plugin para remover crossorigin del HTML
function removeCrossorigin() {
  return {
    name: 'remove-crossorigin',
    transformIndexHtml(html) {
      return html.replace(/\scrossorigin(?:="[^"]*")?/g, '')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), removeCrossorigin()],
  // Solo usa subdirectorio para GitHub Pages, en Vercel usa root
  base: process.env.VITE_BASE_PATH || '/',
  build: {
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
