import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

// Plugin: copy src/posts/*.md to dist/posts/ for direct .md URL access
function copyPostsPlugin() {
  return {
    name: 'copy-posts',
    closeBundle() {
      const src = path.resolve('src/posts');
      const dest = path.resolve('dist/posts');
      if (!fs.existsSync(src)) return;
      fs.mkdirSync(dest, { recursive: true });
      for (const file of fs.readdirSync(src)) {
        if (file.endsWith('.md')) {
          fs.copyFileSync(path.join(src, file), path.join(dest, file));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [svelte(), copyPostsPlugin()],
  base: '/',
  server: {
    allowedHosts: true,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
