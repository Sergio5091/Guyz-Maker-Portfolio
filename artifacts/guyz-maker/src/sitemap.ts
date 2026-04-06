import { SitemapRoute, sitemap } from 'react-router-sitemap';

const routes = [
  'https://guyzmaker.com/',
  'https://guyzmaker.com/projects',
  'https://guyzmaker.com/services',
  'https://guyzmaker.com/blog',
  'https://guyzmaker.com/about',
  'https://guyzmaker.com/contact',
];

export const sitemapRoutes: SitemapRoute[] = routes.map(route => ({
  url: route,
  lastModified: new Date(),
  changeFreq: 'weekly',
  priority: route === 'https://guyzmaker.com/' ? 1.0 : 0.8,
}));

export default sitemap(sitemapRoutes);
