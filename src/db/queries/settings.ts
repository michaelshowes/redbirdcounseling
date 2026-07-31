import { Service, Subpages } from '@/payload-types';

import { payload } from '..';
import { getPublishedServices } from './services';

export const getSettings = async () => {
  const result = await payload.findGlobal({
    slug: 'settings'
  });

  return {
    ...result,
    contactForm: result.contactForm?.contactForm,
    mainMenuCTA: result.menus.link,
    menus: result.menus?.menus,
    footer: result.footer,
    orderedServices: result.services?.servicesOrder?.services
  };
};

export const getSiteMetadata = async () => {
  const result = await payload.findGlobal({
    slug: 'settings'
  });

  return result.metadata;
};

/**
 * Turns every published Specialty into dropdown subpages, sorted by the global
 * "Specialties Order" list. Specialties missing from that list keep their
 * collection order and are appended at the end, so a newly published one always
 * shows up in the menu without any manual setup.
 */
function buildSpecialtySubpages(
  services: Service[],
  order?: { service?: (number | null) | Service }[] | null
): Subpages {
  const orderedIds = (order ?? [])
    .map(({ service }) => (typeof service === 'object' ? service?.id : service))
    .filter((id) => typeof id === 'number');

  const rank = (service: Service) => {
    const index = orderedIds.indexOf(service.id);

    return index === -1 ? orderedIds.length : index;
  };

  return [...services]
    .sort((a, b) => rank(a) - rank(b))
    .map((service) => ({
      id: `auto-specialty-${service.id}`,
      subpage: {
        relationTo: 'services' as const,
        value: service
      }
    }));
}

export async function getMenu(menuName: string) {
  const result = await payload.findGlobal({
    slug: 'settings'
  });

  const menu = result.menus?.menus?.find(
    (menu) => menu.menuName?.toLowerCase() === menuName.toLowerCase()
  );

  if (!menu?.menuItems?.some(({ autoSpecialties }) => autoSpecialties)) {
    return menu;
  }

  const subpages = buildSpecialtySubpages(
    await getPublishedServices(),
    result.services?.servicesOrder?.services
  );

  return {
    ...menu,
    menuItems: menu.menuItems.map((item) =>
      item.autoSpecialties ? { ...item, subpages } : item
    )
  };
}
