import type {
  FAQPage,
  LocalBusiness,
  ProfessionalService,
  Thing,
  WebPage,
  WithContext
} from 'schema-dts';

import { getPageBySlug } from '@/db/queries/pages';
import type { Accordion } from '@/payload-types';

/**
 * Generates LocalBusiness structured data for Redbird Counseling
 * This helps Google understand the business location, contact info, and services
 */
export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.meetredbirdcounseling.com/#organization',
    name: 'Redbird Counseling and Consulting',
    alternateName: 'Redbird Counseling',
    description:
      'Professional trauma-informed therapy and substance use counseling in Cincinnati, Ohio. Specializing in PTSD, addiction recovery, and mental health support for women, veterans, and first responders.',
    url: 'https://www.meetredbirdcounseling.com',
    logo: 'https://www.meetredbirdcounseling.com/images/logo.png',
    image: 'https://www.meetredbirdcounseling.com/images/opengraph-image.png',
    telephone: '+1-513-279-8949',
    email: 'nicole@meetredbirdcounseling.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5725 Dragon Way, Suite 320',
      addressLocality: 'Cincinnati',
      addressRegion: 'OH',
      postalCode: '45227',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.1431,
      longitude: -84.428
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Ohio'
      },
      {
        '@type': 'State',
        name: 'Kentucky'
      },
      {
        '@type': 'City',
        name: 'Cincinnati',
        '@id': 'https://en.wikipedia.org/wiki/Cincinnati'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Counseling Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Trauma Therapy',
            description:
              'Evidence-based trauma therapy for PTSD and complex trauma'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Substance Use Counseling',
            description:
              'Compassionate substance use and addiction recovery counseling'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Veterans Counseling',
            description:
              'Specialized mental health support for veterans and military families'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'First Responders Therapy',
            description:
              'Mental health counseling for first responders and emergency personnel'
          }
        }
      ]
    },
    founder: {
      '@type': 'Person',
      name: 'Nicole Michels',
      jobTitle: 'Licensed Professional Clinical Counselor Supervisor (LPCC-S)',
      telephone: '+1-513-279-8949',
      email: 'nicole@meetredbirdcounseling.com'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    sameAs: [
      'https://www.psychologytoday.com/us/therapists/nicole-michels-cincinnati-oh/1086696'
    ]
  };
}

/**
 * Generates ProfessionalService structured data
 * This helps Google understand the professional nature of the services
 */
export function generateProfessionalServiceSchema(): WithContext<ProfessionalService> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://www.meetredbirdcounseling.com/#service',
    name: 'Redbird Counseling and Consulting',
    description:
      'Licensed professional counseling services in Cincinnati, Ohio. Trauma-informed therapy, substance use counseling, and mental health support.',
    provider: {
      '@type': 'Person',
      name: 'Nicole Michels',
      jobTitle: 'LPCC-S',
      credential: 'Licensed Professional Clinical Counselor Supervisor'
    },
    serviceType: [
      'Mental Health Counseling',
      'Trauma Therapy',
      'PTSD Treatment',
      'Substance Use Counseling',
      'Addiction Recovery',
      'Veterans Counseling',
      'First Responders Therapy'
    ],
    areaServed: {
      '@type': 'State',
      name: 'Ohio'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '5725 Dragon Way, Suite 320',
          addressLocality: 'Cincinnati',
          addressRegion: 'OH',
          postalCode: '45227',
          addressCountry: 'US'
        }
      }
    }
  } as WithContext<ProfessionalService>;
}

/**
 * Generates FAQ structured data from the FAQ page content
 * This can help your pages appear in featured snippets
 */
export async function generateFAQSchema(): Promise<WithContext<FAQPage>> {
  const faqPage = await getPageBySlug('faq');

  // Extract FAQ items from the Accordion block
  const accordionBlock = faqPage?.content?.content?.find(
    (block) => block.blockType === 'accordion'
  ) as Accordion | undefined;

  // Helper function to strip HTML tags from rich text
  const stripHtml = (html: string | undefined): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  // Generate schema from actual FAQ content if available, otherwise use fallback
  const faqItems = accordionBlock?.items?.length
    ? accordionBlock.items.map((item) => ({
        '@type': 'Question' as const,
        name: item.itemTitle,
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: stripHtml(
            typeof item.text === 'string'
              ? item.text
              : JSON.stringify(item.text)
          )
        }
      }))
    : [
        // Fallback FAQ items if page isn't found or doesn't have accordion
        {
          '@type': 'Question' as const,
          name: 'What types of therapy does Redbird Counseling offer in Cincinnati?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: 'Redbird Counseling in Cincinnati offers trauma-informed therapy, substance use counseling, PTSD treatment, addiction recovery support, and specialized counseling for women, veterans, and first responders. We use evidence-based approaches including CBT, DBT, and trauma-focused therapies.'
          }
        },
        {
          '@type': 'Question' as const,
          name: 'Do you accept insurance for counseling services in Cincinnati?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: 'Yes, Redbird Counseling accepts most major insurance plans including Aetna, Anthem, BlueCross BlueShield, UnitedHealthcare, and others. We also offer a sliding scale for those who qualify. Contact us to verify your specific insurance coverage.'
          }
        },
        {
          '@type': 'Question' as const,
          name: 'Are counseling sessions available online or in-person?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: 'Redbird Counseling offers both in-person sessions at our Cincinnati office (5725 Dragon Way, Suite 320) and secure online teletherapy sessions for clients in Ohio and Kentucky. This flexibility allows you to receive care in the way that works best for you.'
          }
        },
        {
          '@type': 'Question' as const,
          name: 'What credentials does Nicole Michels have?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: 'Nicole Michels is a Licensed Professional Clinical Counselor Supervisor (LPCC-S) with a Master of Arts from Xavier University. She is licensed in both Ohio and Kentucky and has over 16 years of experience specializing in trauma, substance use, and mental health counseling.'
          }
        },
        {
          '@type': 'Question' as const,
          name: 'How do I schedule a consultation with a Cincinnati counselor?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: 'Redbird Counseling offers a free 15-minute consultation. You can call us at (513) 279-8949 or email nicole@meetredbirdcounseling.com to schedule your initial consultation and see if our services are right for you.'
          }
        }
      ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems
  };
}

/**
 * Generates WebPage structured data with breadcrumbs
 */
export function generateWebPageSchema(args: {
  url: string;
  title: string;
  description: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}): WithContext<WebPage> {
  const { url, title, description, breadcrumbs } = args;

  const schema: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://www.meetredbirdcounseling.com/#website',
      url: 'https://www.meetredbirdcounseling.com',
      name: 'Redbird Counseling and Consulting'
    }
  };

  if (breadcrumbs && breadcrumbs.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }

  return schema;
}

/**
 * Helper function to inject structured data into the page
 */
export function StructuredData({
  data
}: {
  data:
    | WithContext<LocalBusiness>
    | WithContext<ProfessionalService>
    | WithContext<FAQPage>
    | WithContext<WebPage>
    | WithContext<Thing>;
}) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
