import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  build: {
    rollupOptions: {
      external: [
        'vendor/pristine/pristine.min.js',
        'vendor/nouislider/nouislider.js'
      ],
      input: {
        main: 'index.html',
      }
    }
  }
});
