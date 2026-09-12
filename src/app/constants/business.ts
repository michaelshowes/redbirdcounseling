// Single source of truth for the practice's name, address and phone (NAP).
//
// These values previously lived as literals scattered across structuredData,
// metadataDefaults, mergeOpenGraph and generateMeta, which is how the site ended
// up publishing a Cincinnati street address labelled "Denver, OH 45227" after a
// find-and-replace. Anything that needs a business fact imports it from here.
//
// NAP must match Google Business Profile and Psychology Today exactly - an
// inconsistency between them is what actually costs local search ranking.

export const BUSINESS_NAME = 'Redbird Counseling and Consulting';
export const BUSINESS_ALTERNATE_NAME = 'Redbird Counseling';

export const BUSINESS_URL = 'https://www.meetredbirdcounseling.com';

export const BUSINESS_PHONE_DISPLAY = '720-679-8798';
/** E.164-ish form required by schema.org `telephone`. */
export const BUSINESS_PHONE_SCHEMA = '+1-720-679-8798';

export const BUSINESS_EMAIL = 'nicole@meetredbirdcounseling.com';

export const BUSINESS_ADDRESS = {
  street: '698 Briggs Street',
  city: 'Erie',
  state: 'CO',
  zip: '80516',
  country: 'US'
} as const;

/** Erie, CO. Used by both the geo meta tags and LocalBusiness `geo`. */
export const BUSINESS_GEO = {
  latitude: 40.0508,
  longitude: -105.0672
} as const;

/** States Nicole is licensed in and can see clients in. */
export const LICENSED_STATES = ['Colorado', 'Ohio', 'Kentucky'] as const;

export const PRACTITIONER_NAME = 'Nicole Michels';
export const PRACTITIONER_CREDENTIAL = 'LPC';
export const PRACTITIONER_FULL_NAME = 'Nicole Michels, LPC';
export const PRACTITIONER_JOB_TITLE = 'Licensed Professional Counselor';

export const CONSULT_LENGTH_MINUTES = 20;

export const PSYCHOLOGY_TODAY_PROFILE =
  'https://www.psychologytoday.com/us/therapists/nicole-michels-erie-co/1086696';
