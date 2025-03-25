import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from '@nabla/vite-plugin-eslint';
import { configDefaults, coverageConfigDefaults } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  envPrefix: 'REACT_APP_',
  plugins: [react(), mode !== 'test' && eslint()],
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@open-city-design': path.resolve(__dirname, 'node_modules/open-city-design'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'e2e/'],
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['clover', 'json', 'lcov', 'text'],
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: [...coverageConfigDefaults.exclude, '.src/serviceWorker.js'],
      provider: 'istanbul',
    },
    testTimeout: 1000000,
  },
}));
