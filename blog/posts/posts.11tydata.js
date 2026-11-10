import { apaCitation, bibtex, blogPostingLd } from '../lib/filters.js';

// Drafts show in `eleventy --serve` but are dropped from production builds
const isBuild = () => process.env.ELEVENTY_RUN_MODE === 'build';
const hidden = (data) => data.draft === true && isBuild();

export default {
  layout: 'layouts/post.njk',
  tags: ['posts'],
  isArticle: true,
  eleventyComputed: {
    permalink: (data) => (hidden(data) ? false : `/writing/${data.page.fileSlug}.html`),
    eleventyExcludeFromCollections: (data) => hidden(data),
    canonicalUrl: (data) => `${data.site.url}/writing/${data.page.fileSlug}`,
    ogImage: (data) => (data.image ? `${data.site.url}/writing/images/${data.image}` : data.site.defaultImage),
    apa: (data) => apaCitation({ title: data.title, date: data.date, url: `${data.site.url}/writing/${data.page.fileSlug}` }),
    bibtexEntry: (data) => bibtex({ title: data.title, date: data.date, url: `${data.site.url}/writing/${data.page.fileSlug}`, slug: data.page.fileSlug }),
    ldData: (data) =>
      blogPostingLd({
        title: data.title,
        description: data.description,
        date: data.date,
        updated: data.updated,
        tags: data.tags,
        url: `${data.site.url}/writing/${data.page.fileSlug}`,
        image: data.image ? `${data.site.url}/writing/images/${data.image}` : data.site.defaultImage,
        site: data.site,
      }),
  },
};
