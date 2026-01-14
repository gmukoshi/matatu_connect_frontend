import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            if (err.code === 'ECONNREFUSED') {
              return;
            }
            console.error('Proxy error:', err);
          });
        }
      },
      '/socket.io': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            if (err.code === 'ECONNREFUSED') {
              return;
            }
            console.error('Socket proxy error:', err);
          });
        }
      }
    }
  }
})
