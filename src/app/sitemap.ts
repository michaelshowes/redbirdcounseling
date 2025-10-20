import { MetadataRoute } from 'next';

import { payload } from '@/db';
import { Page, Service } from '@/payload-types';
import { getServerSideURL } from '@/utils/getURL';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL();

  // Fetch all published pages
  const pagesResult = await payload.find({
    collection: 'pages',
    limit: 1000,
    where: {
      _status: {
        equals: 'published'
      }
    },
    select: {
      slug: true,
      updatedAt: true
    }
  });

  // Fetch all published services
  const servicesResult = await payload.find({
    collection: 'services',
    limit: 1000,
    where: {
      _status: {
        equals: 'published'
      }
    },
    select: {
      slug: true,
      updatedAt: true
    }
  });

  const pages = pagesResult.docs as Page[];
  const services = servicesResult.docs as Service[];

  // Map pages to sitemap entries
  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: page.slug === 'home' ? 1 : 0.8
  }));

  // Map services to sitemap entries
  // Services are nested under /services/{slug}
  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  // Home page entry
  const homeEntry: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    }
  ];

  return [...homeEntry, ...pageEntries, ...serviceEntries];
}
