import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic',
            importSource: 'react'
          }]
        ]
      }
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'react': path.resolve('node_modules/react'),
      'react-dom': path.resolve('node_modules/react-dom'),
      'react-icons': path.resolve('node_modules/react-icons'),
      'leaflet': path.resolve('node_modules/leaflet/dist/leaflet-src.esm.js')
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-icons',
      'leaflet',
      'react-leaflet'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        interop: 'auto',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'map-vendor': ['leaflet', 'react-leaflet']
        }
      }
    }
  }
});