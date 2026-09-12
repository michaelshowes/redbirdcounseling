// Single source of truth for metadata fallbacks.
// Used as the code-side defaults in layout.tsx AND surfaced to editors as
// placeholders/help text in Settings → Metadata (see metadataSettings.ts), so
// the values the admin sees always match what actually renders when a field is
// left empty.
import {
  BUSINESS_ALTERNATE_NAME,
  BUSINESS_NAME,
  PRACTITIONER_FULL_NAME
} from './business';

export const DEFAULT_SITE_NAME = `${BUSINESS_ALTERNATE_NAME} | Therapy for Hyper-Independent Moms | ${PRACTITIONER_FULL_NAME} | CO, OH & KY`;

export const DEFAULT_TITLE_TEMPLATE = `%s | ${BUSINESS_ALTERNATE_NAME}`;

export const DEFAULT_DESCRIPTION = `${PRACTITIONER_FULL_NAME} helps hyper-independent, overfunctioning moms break free from stress, overwhelm, and using alcohol to cope. Virtual therapy in CO, OH & KY. Book a free 20-min consult.`;

export const DEFAULT_KEYWORDS = [
  'hyper-independent mom therapist',
  'overfunctioning mom therapy Colorado',
  'mom burnout therapist virtual',
  'therapy for moms who drink to cope',
  'am I drinking too much therapist',
  'hyper-independence therapy Erie CO',
  'overwhelmed mom therapist Ohio',
  'EMDR therapy virtual Colorado',
  'therapist for moms Kentucky',
  'mental load therapy',
  'wine mom therapy',
  'Nicole Michels LPC Erie Colorado'
];

export const DEFAULT_AUTHOR = PRACTITIONER_FULL_NAME;
export const DEFAULT_CREATOR = BUSINESS_NAME;
export const DEFAULT_PUBLISHER = BUSINESS_NAME;
