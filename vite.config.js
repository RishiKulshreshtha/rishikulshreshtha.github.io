import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';

// Plugin: copy src/posts/*.md to docs/posts/ for direct .md URL access
function copyPostsPlugin() {
  return {
    name: 'copy-posts',
    closeBundle() {
      const src = path.resolve('src/posts');
      const dest = path.resolve('docs/posts');
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
  plugins: [sveltekit(), copyPostsPlugin()],
  server: {
    allowedHosts: true,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
