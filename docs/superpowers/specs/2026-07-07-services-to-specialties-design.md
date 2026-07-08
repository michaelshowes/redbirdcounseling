# Rename "Services" → "Specialties" (user-facing + URLs)

**Date:** 2026-07-07
**Status:** Implemented

## Goal

Client wants the "Services" section renamed to "Specialties" everywhere a visitor
or CMS editor sees it, including URLs, with SEO preserved via 301 redirects.

## Approach

Keep internal identifiers unchanged (Payload collection slug `services`, block slug
`service-grid`, DB tables, component/file names, `serviceSlug` route param,
`services-sitemap` cache tag). Rename only what is visible.

### 1. URLs (code)

- `src/app/(app)/[slug]/[serviceSlug]/page.tsx`: route guard `slug !== 'specialties'`,
  breadcrumb name "Specialties", structured-data URLs `/specialties/...`
- `src/app/sitemap.ts`, `src/app/(payload)/collections/Services/revalidateService.ts`,
  `src/utils/generatePreviewPath.ts`: path prefix `/specialties`
- Link builders: `ServiceGrid.tsx`, `heroes/ServicesHero.tsx`, `global/SiteFooter.tsx`,
  `RichTextRenderer.tsx`, `global/Menu/MobileSubMenu.tsx`, `global/Menu/MobileMenu.tsx`
- `next.config.ts`: permanent redirects `/services` → `/specialties` and
  `/services/:slug` → `/specialties/:slug`

### 2. Visible copy (code)

- Footer heading, mobile menu overview card copy
- Structured data catalog name "Counseling Specialties" (schema.org `@type: 'Service'`
  vocabulary is untouched — it's Google's vocabulary, not site copy)

### 3. Admin labels (code, no slug changes)

- Services collection: `labels: { singular: 'Specialty', plural: 'Specialties' }`
- Settings tab/group/field labels ("Specialties Order" etc.)
- Pages hero template option label "Specialties" (value stays `services`)
- Service Grid block labeled "Specialty Grid"

### 4. CMS content (Neon DB)

Handled by `scripts/rename-services-to-specialties.ts` (Payload Local API, draft-aware,
idempotent):

- Listing page: slug `services` → `specialties`, title → "Specialties" (nav menus
  display the page title), hero/meta title word swap
- `service-grid` block titles and `service-grid`/`cta` link labels on all pages
  ("See All Services" → "See All Specialties", etc.)
- Pages with newer unpublished drafts get the published version updated AND the
  draft re-saved, so the live site never regresses and editors keep their WIP

Already run against dev. **Must be run against prod at deploy time** (same deploy as
the code) or `/specialties` 404s:

```sh
DATABASE_URL="<prod pooler connection string>" pnpm payload run scripts/rename-services-to-specialties.ts
```

## Out of scope

Natural-language prose such as "counseling services in Denver" in SEO descriptions
and FAQ answers; deep rename of collection slug / DB tables.
