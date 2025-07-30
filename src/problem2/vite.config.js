import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  root: '.',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  preview: {
    port: 4173,
    open: true
  },
  
  assetsInclude: ['**/*.svg'],
  
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material']
  }
}) 