import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic' // Remove importSource when using classic runtime
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
      'react-icons',
      'leaflet',
      'react-leaflet'
    ]
  },
  build: {
    rollupOptions: {
      output: {
        interop: 'auto'
      }
    }
  }
});