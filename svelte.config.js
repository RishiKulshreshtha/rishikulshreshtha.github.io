import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: '404.html',
      precompress: false,
      strict: true,
    }),
    prerender: {
      // 11ty owns /writing/** and /rss.xml; fail on any other broken link
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('/writing') || path === '/rss.xml') return;
        throw new Error(message);
      },
    },
  },
};
