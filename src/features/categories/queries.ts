import { CategoryFilters } from ".";

const categoryKeys = {
  categories: ["categories"],
  categoriesFiltered: (filters: CategoryFilters) => [
    ...categoryKeys.categories,
    filters,
  ],
  category: (id: number) => [...categoryKeys.categories, id],
};

export default categoryKeys;
