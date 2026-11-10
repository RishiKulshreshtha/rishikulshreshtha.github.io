// One setting for the canonical origin; change SITE_URL (or this default) when a custom domain is added
const url = (process.env.SITE_URL || 'https://rishikulshreshtha.github.io').replace(/\/$/, '');

export default {
  url,
  title: 'Rishi Kulshreshtha — Writing',
  description: 'Notes on Drupal, web accessibility, and AI-readiness from Rishi Kulshreshtha.',
  language: 'en-us',
  // GoatCounter site code (https://<code>.goatcounter.com); analytics are skipped when empty
  goatcounter: process.env.GOATCOUNTER_CODE || '',
  gtm: 'GTM-KDQVGPV2',
  defaultImage: `${url}/img/profile.webp`,
  author: {
    name: 'Rishi Kulshreshtha',
    id: `${url}/#person`,
    url: `${url}/`,
    aboutUrl: `${url}/about`,
    bio: 'Senior Drupal engineer at Redfin Solutions, LLC, focused on web accessibility (WCAG, Section 508, ADA) and AI-readiness of public-interest websites. Building with Drupal since 2011.',
    sameAs: [
      'https://www.linkedin.com/in/rishikulshreshtha/',
      'https://github.com/RishiKulshreshtha/',
      'https://www.drupal.org/u/rishikulshreshtha',
      'https://x.com/RishiShreshtha',
    ],
  },
  socials: [
    { href: 'https://www.linkedin.com/in/rishikulshreshtha/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://github.com/RishiKulshreshtha/', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://www.drupal.org/u/rishikulshreshtha', icon: 'fab fa-drupal', label: 'Drupal.org' },
    { href: 'https://git.drupalcode.org/RishiKulshreshtha', icon: 'fab fa-gitlab', label: 'GitLab' },
    { href: 'https://stackexchange.com/users/941018/rishi-kulshreshtha', icon: 'fab fa-stack-exchange', label: 'StackExchange' },
    { href: 'https://x.com/RishiShreshtha', icon: 'fab fa-x-twitter', label: 'X' },
  ],
  year: new Date().getFullYear(),
};
