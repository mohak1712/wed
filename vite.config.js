import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base '/' — needed so asset URLs resolve correctly from the theme sub-paths (/1 .. /5), not just the root.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
