import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Category } from "../types";
import categoryKeys from "./queries";

export type CategoryFilters = {
  page?: number;
  per_page?: number;
  orderby?: string;
  order?: string;
  search?: string;
  parent?: boolean;
  post?: boolean;
  slug?: boolean;
};

const filters = {
  per_page: 100,
};

export const getCategories = async (parent?: number) => {
  const response = await axios.get<Category[]>("/categories", {
    params: { ...filters, parent },
  });
  return response.data;
};

export const useCategories = (parent?: number) => {
  return useQuery(categoryKeys.categoriesFiltered(filters), () =>
    getCategories(parent)
  );
};

export const useCategory = (id: number) => {
  return useQuery(categoryKeys.category(id), async () => {
    const response = await axios.get<Category>("/categories/" + id);
    return response.data;
  });
};
