import { ObavijestiFilters } from ".";

const obavijestiKeys = {
  obavijesti: ["obavijesti"],
  sliderObavijesti: ["obavijesti", "slider"],
  homeObavijesti: ["obavijesti", "home"],
  categories: ["categories"],
  obavijestiFiltered: (filters: ObavijestiFilters) => [
    ...obavijestiKeys.obavijesti,
    filters,
  ],
  obavijest: (slug: string) => [...obavijestiKeys.obavijesti, slug],
};

export default obavijestiKeys;
