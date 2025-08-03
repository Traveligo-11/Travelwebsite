import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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
      'cookie',
      '@headlessui/react',
      '@heroicons/react',
      'leaflet',
      'react-leaflet',
      '@emailjs/browser',   // ✅ Fix EmailJS
      'react-icons'         // ✅ Pre-bundle react-icons
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },
      plugins: [
        {
          name: 'fix-leaflet',
          setup(build) {
            build.onResolve({ filter: /^leaflet$/ }, () => {
              return { path: require.resolve('leaflet') };
            });
            build.onResolve({ filter: /^react-leaflet$/ }, () => {
              return { path: require.resolve('react-leaflet') };
            });
            build.onResolve({ filter: /^cookie$/ }, () => {
              return { path: require.resolve('cookie') };
            });
          }
        }
      ]
    }
  },

  resolve: {
    alias: {
      // ✅ Removed invalid react-leaflet alias
      'leaflet': path.resolve(__dirname, 'node_modules/leaflet/dist/leaflet-src.esm.js'),
      'cookie': path.resolve(__dirname, 'node_modules/cookie/index.js')
      // ✅ Removed React alias completely to fix jsx-runtime error
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

    commonjsOptions: {
      transformMixedEsModules: true,
      include: [
        /node_modules\/react-router/,
        /node_modules\/cookie/,
        /node_modules\/react-leaflet/,
        /node_modules\/leaflet/,
        /node_modules\/@emailjs/,    // ✅ Fix EmailJS
        /node_modules\/react-icons/  // ✅ Fix react-icons
      ],
      exclude: [
        /node_modules\/cookie\/index\.js/
      ]
    },

    rollupOptions: {
      output: {
        interop: 'auto',  // ✅ Fix React default export issues
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'cookie-vendor': ['cookie']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
      external: ['cookie']
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
