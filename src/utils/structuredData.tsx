import type {
  BlogPosting,
  FAQPage,
  MedicalBusiness,
  Thing,
  WebPage,
  WithContext
} from 'schema-dts';

import {
  BUSINESS_ADDRESS,
  BUSINESS_ALTERNATE_NAME,
  BUSINESS_EMAIL,
  BUSINESS_GEO,
  BUSINESS_NAME,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_SCHEMA,
  BUSINESS_URL,
  CONSULT_LENGTH_MINUTES,
  LICENSED_STATES,
  PRACTITIONER_CREDENTIAL,
  PRACTITIONER_FULL_NAME,
  PRACTITIONER_JOB_TITLE,
  PRACTITIONER_NAME,
  PSYCHOLOGY_TODAY_PROFILE
} from '@/app/constants/business';
import { getPageBySlug } from '@/db/queries/pages';
import type { Accordion, Media, Post } from '@/payload-types';

const BUSINESS_DESCRIPTION =
  'Therapy for hyper-independent, overfunctioning moms in Colorado, Ohio, and Kentucky.';

/** Every page's schema points back at this one id, so search engines resolve a
 * single business entity rather than several competing ones. */
const ORGANIZATION_ID = `${BUSINESS_URL}/#organization`;

const postalAddress = {
  '@type': 'PostalAddress' as const,
  streetAddress: BUSINESS_ADDRESS.street,
  addressLocality: BUSINESS_ADDRESS.city,
  addressRegion: BUSINESS_ADDRESS.state,
  postalCode: BUSINESS_ADDRESS.zip,
  addressCountry: BUSINESS_ADDRESS.country
};

const areaServedStates = LICENSED_STATES.map((name) => ({
  '@type': 'State' as const,
  name
}));

/** Sessions are virtual, so the channel - not a physical location - is what
 * prospective clients need to see. `availableChannel` is a property of Service
 * in schema.org, so it hangs off each offered service, not off the business. */
const telehealthChannel = {
  '@type': 'ServiceChannel' as const,
  name: 'Telehealth',
  serviceUrl: `${BUSINESS_URL}/contact`,
  availableLanguage: {
    '@type': 'Language' as const,
    name: 'English'
  }
};

const practitioner = {
  '@type': 'Person' as const,
  name: PRACTITIONER_NAME,
  honorificSuffix: PRACTITIONER_CREDENTIAL,
  jobTitle: PRACTITIONER_JOB_TITLE,
  telephone: BUSINESS_PHONE_SCHEMA,
  email: BUSINESS_EMAIL
};

/** Wraps a specialty as an Offer, tagged as telehealth-delivered across all
 * three licensed states. */
const offeredService = (name: string, description: string) => ({
  '@type': 'Offer' as const,
  itemOffered: {
    '@type': 'Service' as const,
    name,
    description,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: areaServedStates,
    availableChannel: telehealthChannel
  }
});

/**
 * The practice as a single schema.org entity, declared as both a
 * MedicalBusiness and a LocalBusiness so crawlers reading either vocabulary
 * resolve it.
 *
 * This previously spanned three competing nodes (LocalBusiness,
 * ProfessionalService, and the WebPage `isPartOf`) carrying conflicting
 * addresses, which leaves search engines no single entity to attach trust to.
 */
export function generateLocalBusinessSchema(): WithContext<MedicalBusiness> {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': ORGANIZATION_ID,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_ALTERNATE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: BUSINESS_URL,
    logo: `${BUSINESS_URL}/images/logo.png`,
    image: `${BUSINESS_URL}/images/opengraph-image.png`,
    telephone: BUSINESS_PHONE_SCHEMA,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates' as const,
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude
    },
    areaServed: areaServedStates,
    hasOfferCatalog: {
      '@type': 'OfferCatalog' as const,
      name: 'Counseling Specialties',
      itemListElement: [
        offeredService(
          'Therapy for Hyper-Independence',
          'Therapy for moms who carry everything alone and struggle to ask for help'
        ),
        offeredService(
          'Therapy for Overwhelm and Mom Burnout',
          'Support for the mental load, overfunctioning, and burnout that come with holding it all together'
        ),
        offeredService(
          'Alcohol and Stress Therapy',
          'Therapy for moms using alcohol to unwind at the end of a stressful day'
        ),
        offeredService(
          'EMDR Therapy',
          'Virtual EMDR therapy for trauma, anxiety, and stuck patterns'
        )
      ]
    },
    founder: practitioner,
    employee: practitioner,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: [
          'Monday' as const,
          'Tuesday' as const,
          'Wednesday' as const,
          'Thursday' as const,
          'Friday' as const
        ],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    sameAs: [PSYCHOLOGY_TODAY_PROFILE]
  } satisfies WithContext<MedicalBusiness>;

  // JSON-LD lets an entity declare several types; schema-dts models `@type` as
  // a single literal and cannot express that. Every field above is still
  // typechecked against MedicalBusiness - only the `@type` widening is asserted.
  return {
    ...business,
    '@type': ['MedicalBusiness', 'LocalBusiness']
  } as unknown as WithContext<MedicalBusiness>;
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
          name: `Who does ${BUSINESS_ALTERNATE_NAME} work with?`,
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: `${BUSINESS_NAME} works with hyper-independent, overfunctioning moms - the ones everyone else leans on. ${PRACTITIONER_FULL_NAME} helps with overwhelm, the mental load, burnout, and using alcohol to cope at the end of a stressful day.`
          }
        },
        {
          '@type': 'Question' as const,
          name: 'What states are sessions available in?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: `${PRACTITIONER_FULL_NAME} is licensed in ${LICENSED_STATES.join(', ')}, and sees clients virtually in all three.`
          }
        },
        {
          '@type': 'Question' as const,
          name: 'Are sessions online or in person?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: `All sessions are virtual. Secure video therapy means you can be seen from home, on a lunch break, or anywhere in ${LICENSED_STATES.join(', ')} without adding a commute to your day.`
          }
        },
        {
          '@type': 'Question' as const,
          name: `What credentials does ${PRACTITIONER_NAME} have?`,
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: `${PRACTITIONER_NAME} is a ${PRACTITIONER_JOB_TITLE} (${PRACTITIONER_CREDENTIAL}) licensed in ${LICENSED_STATES.join(', ')}, specializing in therapy for overwhelmed and hyper-independent moms.`
          }
        },
        {
          '@type': 'Question' as const,
          name: 'How do I schedule a consultation?',
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: `${BUSINESS_ALTERNATE_NAME} offers a free ${CONSULT_LENGTH_MINUTES}-minute consultation. Call ${BUSINESS_PHONE_DISPLAY} or email ${BUSINESS_EMAIL} to schedule and see whether it is a good fit.`
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
 * Article markup for a single blog post. `author` and `publisher` both resolve
 * to the one business entity above, so posts accrue to the same identity the
 * rest of the site builds.
 */
export function generateArticleSchema(args: {
  post: Post;
  url: string;
}): WithContext<BlogPosting> {
  const { post, url } = args;
  const image = typeof post.image === 'object' ? (post.image as Media) : null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.meta?.description || post.excerpt,
    ...(image?.url
      ? {
          image: image.url.startsWith('http')
            ? image.url
            : `${BUSINESS_URL}${image.url}`
        }
      : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: {
      '@type': 'Person',
      name: PRACTITIONER_FULL_NAME,
      jobTitle: PRACTITIONER_JOB_TITLE
    },
    publisher: { '@id': ORGANIZATION_ID }
  } as WithContext<BlogPosting>;
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
      '@id': `${BUSINESS_URL}/#website`,
      url: BUSINESS_URL,
      name: BUSINESS_NAME
    },
    // Ties every page back to the single business entity above.
    about: { '@id': ORGANIZATION_ID }
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
    | WithContext<MedicalBusiness>
    | WithContext<BlogPosting>
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
