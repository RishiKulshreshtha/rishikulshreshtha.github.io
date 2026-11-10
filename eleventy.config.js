import fs from 'node:fs';
import path from 'node:path';
import rssPlugin from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import Image from '@11ty/eleventy-img';
import * as filters from './blog/lib/filters.js';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  for (const [name, fn] of Object.entries(filters)) {
    if (typeof fn === 'function') eleventyConfig.addFilter(name, fn);
  }

  // Raw post source (with front matter) for the /writing/<slug>.md copies
  eleventyConfig.addFilter('rawFile', (inputPath) => fs.readFileSync(inputPath, 'utf8'));

  eleventyConfig.addCollection('tagList', (api) => {
    const tags = new Set();
    for (const post of api.getFilteredByTag('posts')) {
      for (const tag of post.data.tags || []) if (tag !== 'posts') tags.add(tag);
    }
    return [...tags].sort();
  });

  // Responsive images for `image:` front matter (files live in blog/images/)
  eleventyConfig.addAsyncShortcode('postImage', async (file, alt = '') => {
    if (!file) return '';
    const meta = await Image(path.join('blog/images', file), {
      widths: [480, 960, 1440],
      formats: ['webp', 'jpeg'],
      outputDir: 'docs/writing/img/',
      urlPath: '/writing/img/',
    });
    return Image.generateHTML(meta, {
      alt,
      sizes: '(min-width: 768px) 720px, 100vw',
      loading: 'eager',
      decoding: 'async',
    });
  });

  eleventyConfig.addPassthroughCopy({ 'src/app.css': 'writing/assets/site.css' });
  eleventyConfig.addPassthroughCopy({
    'node_modules/@fortawesome/fontawesome-free/css/all.min.css': 'writing/assets/fa/css/all.min.css',
    'node_modules/@fortawesome/fontawesome-free/webfonts': 'writing/assets/fa/webfonts',
  });
  eleventyConfig.addPassthroughCopy({ 'blog/assets': 'writing/assets' });
  eleventyConfig.addPassthroughCopy({ 'blog/images': 'writing/images' });

  eleventyConfig.setServerOptions({ showVersion: false });

  return {
    dir: { input: 'blog', output: 'docs', includes: '_includes', data: '_data' },
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk'],
  };
}
