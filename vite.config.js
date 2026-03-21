import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png', 'imagenes/*.png'],
      manifest: {
        name: 'ManejaCL — Simulador Examen Teórico CONASET',
        short_name: 'ManejaCL',
        description: 'Practica gratis el examen teórico de conducir chileno. 160 preguntas oficiales CONASET.',
        theme_color: '#0a0f1a',
        background_color: '#0a0f1a',
        display: 'standalone',
        start_url: '/',
        lang: 'es-CL',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})

