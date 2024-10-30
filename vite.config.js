import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.BACK_END': JSON.stringify(process.env.BACK_END)
  },
  plugins: [react()],
})
