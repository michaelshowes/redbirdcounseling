import { MetadataRoute } from 'next';

import { payload } from '@/db';
import { Page, Post, Service } from '@/payload-types';
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

  // Fetch all published posts
  const postsResult = await payload.find({
    collection: 'posts',
    limit: 1000,
    sort: '-publishedAt',
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
  const posts = postsResult.docs as Post[];
  const services = servicesResult.docs as Service[];

  // Map pages to sitemap entries
  // The home page is emitted separately as the root URL below, so exclude its
  // slug here to avoid listing both `/` and `/home` (duplicate content).
  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.slug !== 'home')
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: page.slug === 'about' || page.slug === 'contact' ? 0.9 : 0.8
    }));

  // Map services to sitemap entries
  // Services are nested under /specialties/{slug}
  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/specialties/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  // The blog index plus every post. The index changes whenever a post is
  // published, so it tracks the newest post's timestamp rather than a fixed date.
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  const blogIndexEntry: MetadataRoute.Sitemap = posts.length
    ? [
        {
          url: `${baseUrl}/blog`,
          lastModified: new Date(posts[0].updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.8
        }
      ]
    : [];

  // Home page entry
  const homeEntry: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    }
  ];

  return [
    ...homeEntry,
    ...pageEntries,
    ...serviceEntries,
    ...blogIndexEntry,
    ...postEntries
  ];
}
