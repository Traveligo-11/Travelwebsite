import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    tailwindcss({
      config: './tailwind.config.js'
    })
  ],

  esbuild: {
    jsx: 'automatic',
    jsxDev: process.env.NODE_ENV !== 'production',
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@headlessui/react',
      '@heroicons/react'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },

  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: true,
    
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            res.writeHead(503, {
              'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
              error: 'Backend Unavailable',
              message: 'API server is not responding'
            }));
          });
        }
      },
      
      '/tripadvisor': {
        target: 'http://localhost:5000/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/tripadvisor${path}`
      }
    },

    cors: {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'map-vendor': ['leaflet', 'react-leaflet']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    chunkSizeWarningLimit: 1600
  },

  preview: {
    port: 4173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:5000',
      '/tripadvisor': 'http://localhost:5000/api/tripadvisor'
    }
  },

  define: {
    'process.env': {},
    '__APP_ENV__': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});