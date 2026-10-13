import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@app': src('app'),
      '@core': src('core'),
      '@shared': src('shared'),
      '@features': src('features'),
      '@layout': src('layout'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
