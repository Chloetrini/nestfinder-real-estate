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
  build: {
    rollupOptions: {
      output: {
        // Split heavy libraries into their own cached chunks so the first page load stays small
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('@vis.gl')) return 'vendor-google-maps'
          if (id.includes('@tanstack')) return 'vendor-query'
          if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'vendor-react'
        },
      },
    },
  },
})
