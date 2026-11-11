import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Vercel serves the site from the domain root; GitHub Pages serves it under the repo name.
  // Vercel sets VERCEL=1 during its builds.
  base: process.env.VERCEL ? '/' : '/main_portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
