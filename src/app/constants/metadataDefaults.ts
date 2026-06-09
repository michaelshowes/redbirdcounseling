// Single source of truth for metadata fallbacks.
// Used as the code-side defaults in layout.tsx AND surfaced to editors as
// placeholders/help text in Settings → Metadata (see metadataSettings.ts), so
// the values the admin sees always match what actually renders when a field is
// left empty.

export const DEFAULT_SITE_NAME =
  'Redbird Counseling | Denver Therapist & Counselor in Denver';

export const DEFAULT_TITLE_TEMPLATE = '%s | Redbird Counseling';

export const DEFAULT_DESCRIPTION =
  'Professional counselor and therapist in Denver, Colorado. Trauma-informed therapy, substance use counseling, PTSD treatment, and addiction recovery for women, veterans, and first responders. Licensed in CO, OH & KY. Call (513) 279-8949.';

export const DEFAULT_KEYWORDS = [
  // Primary local keywords
  'counselor Denver',
  'therapist Denver',
  'Denver counselor',
  'Denver therapist',
  'Denver counseling',
  'therapist in Denver Colorado',
  'counselor in Denver OH',
  'mental health counselor Denver',
  // Service-specific local keywords
  'trauma therapist Denver',
  'trauma therapy Denver',
  'PTSD therapist Denver',
  'PTSD therapy Denver',
  'substance use counselor Denver',
  'addiction counselor Denver',
  'addiction therapy Denver',
  'substance abuse counselor Denver',
  // Specialty local keywords
  'veteran counselor Denver',
  'veteran therapist Denver',
  'first responder therapist Denver',
  'women therapist Denver',
  'female therapist Denver',
  // Professional credentials
  'LPCC-S Denver',
  'licensed counselor Denver',
  'licensed therapist Denver Colorado',
  // Regional
  'therapist Colorado',
  'counselor Colorado',
  'therapist Kentucky',
  // Additional
  'mental health therapy Denver',
  'anxiety therapist Denver',
  'depression counselor Denver'
];

export const DEFAULT_AUTHOR = 'Nicole Michels, LPCC-S';
export const DEFAULT_CREATOR = 'Redbird Counseling and Consulting';
export const DEFAULT_PUBLISHER = 'Redbird Counseling and Consulting';
