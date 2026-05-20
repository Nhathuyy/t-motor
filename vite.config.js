import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        landing: 'landing.html',
        main: 'index.html',
        nhaTrang: 'nha-trang.html',
        daNang: 'da-nang.html',
      },
    },
  },
  server: {
    port: 3000,
  },
});
