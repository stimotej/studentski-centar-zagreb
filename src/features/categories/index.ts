import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Category } from "../types";
import categoryKeys from "./queries";
import {
  obavijestiPocetnaStranicaCategory,
  obavijestiTeatarTdCategoryId,
} from "@/utils/constants";

export type CategoryFilters = {
  page?: number;
  per_page?: number;
  orderby?: string;
  order?: string;
  search?: string;
  parent?: number;
  post?: number;
  slug?: string;
};

const filters = {
  per_page: 100,
  exclude: [obavijestiPocetnaStranicaCategory, obavijestiTeatarTdCategoryId],
};

export const getCategories = async (parent?: number) => {
  const response = await axios.get<Category[]>("/categories", {
    params: { ...filters, parent },
  });
  return response.data;
};

export const useCategories = (parent?: number, initialData?: Category[]) => {
  return useQuery(
    categoryKeys.categoriesFiltered({ parent }),
    () => getCategories(parent),
    { initialData }
  );
};

export const useCategory = (id: number) => {
  return useQuery(categoryKeys.category(id), async () => {
    const response = await axios.get<Category>("/categories/" + id);
    return response.data;
  });
};
