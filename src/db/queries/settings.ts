import { payload } from '..';

export const getSettings = async () => {
  const result = await payload.findGlobal({
    slug: 'settings'
  });

  return {
    ...result,
    menus: result.menus?.menus,
    footer: result.footer
  };
};

export async function getMenu(menuName: string) {
  const result = await payload.findGlobal({
    slug: 'settings'
  });

  return result.menus?.menus?.find(
    (menu) => menu.menuName?.toLowerCase() === menuName.toLowerCase()
  );
}
