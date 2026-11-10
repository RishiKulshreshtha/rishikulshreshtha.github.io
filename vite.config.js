import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    allowedHosts: true,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js', 'blog/**/*.test.js'],
  },
});
