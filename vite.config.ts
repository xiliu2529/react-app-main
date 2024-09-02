import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      // '/api2': {
      //   target: 'http://11.255.97.33/home/member/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api2/, ''),
      // },
      '/api': {
        target: 'http://11.255.97.33/home/member/',

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

    },
  },
})
