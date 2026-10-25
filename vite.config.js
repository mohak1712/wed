import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset URLs relative, so the built site works on any host or sub-folder.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
