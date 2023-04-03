import { MenuFilters } from ".";

const menuKeys = {
  menus: ["menus"],
  menusFiltered: (filters: MenuFilters) => [...menuKeys.menus, filters],
  obavijest: (slug: string) => [...menuKeys.menus, slug],
};

export default menuKeys;
