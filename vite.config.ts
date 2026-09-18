import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // host: true exposes dev/preview on the LAN so the page can be opened on a phone
  server: { host: true, port: 5199 },
  preview: { host: true, port: 5199 },
})
