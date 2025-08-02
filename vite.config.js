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
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ]
      }
    }),
    tailwindcss({
      config: './tailwind.config.js'
    })
  ],

  resolve: {
    alias: {
      // Core React paths
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
      
      // Fix warning package
      'warning': path.resolve(__dirname, 'node_modules/warning/browser.js'),
      
      // React-Popper configuration
      'react-popper': path.resolve(__dirname, 'node_modules/react-popper/lib'),
      
      // React Icons
      'react-icons': path.resolve(__dirname, 'node_modules/react-icons'),
      'react-icons/fi': path.resolve(__dirname, 'node_modules/react-icons/fi'),
      
      // EmailJS
      '@emailjs/browser': path.resolve(__dirname, 'node_modules/@emailjs/browser/dist/email.min.js'),
      
      // Source directory alias
      '@': path.resolve(__dirname, './src')
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
      'react-icons',
      'react-icons/fi',
      '@emailjs/browser',
      'warning'
    ],
    exclude: ['@tailwindcss/vite'],
    esbuildOptions: {
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      },
      inject: [
        path.resolve(__dirname, 'node_modules/react/index.js')
      ]
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'terser',
    
    rollupOptions: {
      plugins: [
        {
          name: 'fix-warning-export',
          transform(code, id) {
            if (id.includes('warning/warning.js')) {
              return {
                code: code.replace('module.exports = warning;', 'export default warning;'),
                map: null
              };
            }
          }
        },
        {
          name: 'react-popper-resolver',
          resolveId(source) {
            if (source === 'react-popper') {
              return this.resolve('react-popper/lib/index.js');
            }
          }
        }
      ],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-icons')) {
            return 'react-icons';
          }
          if (id.includes('node_modules/@emailjs')) {
            return 'emailjs';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
        }
      }
    }
  },

  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false
    }
  }
});