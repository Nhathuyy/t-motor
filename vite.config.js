import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        daNang: 'da-nang.html',
        nhaTrang: 'nha-trang.html',
        dalat: 'dalat.html',
        en: 'en/index.html',
        enDaNang: 'en/da-nang.html',
        enNhaTrang: 'en/nha-trang.html',
        enDalat: 'en/dalat.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
