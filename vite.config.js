import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use root path for Vercel, /Dfontes/ for GitHub Pages
// Set VERCEL environment variable when deploying to Vercel
const base = process.env.VERCEL ? '/' : '/Dfontes/'

export default defineConfig({
  plugins: [react()],
  base: base,
  server: {
    port: 3000,
    host: true
  }
})
