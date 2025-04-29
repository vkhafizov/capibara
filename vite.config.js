import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'capybara-icons/*.png'],
      manifest: {
        name: 'Capy-gotchi',
        short_name: 'Capy-gotchi',
        description: 'A virtual capybara pet game',
        theme_color: '#FEF3C7',
        icons: [
          {
            src: 'capybara-icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'capybara-icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
});