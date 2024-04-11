import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  base: '/kekstagram/',
  build: {
    rollupOptions: {
      external: [
        'vendor/pristine/pristine.min.js',
        'vendor/nouislider/nouislider.js'
      ]
    }
  }
});
