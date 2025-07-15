import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Post, PostsMeta } from "../types";
import menuKeys from "./queries";

export type MenuFilters = {
  menu_date: string;
  restaurant: number;
  per_page?: number;
  orderby?: string;
  order?: string;
};

const defaultFilters = {
  per_page: 100,
  orderby: "date",
  order: "asc",
  timestamp: new Date().getTime(),
};

export const getMenus = async (filters: MenuFilters) => {
  const response = await axios.get<Post<PostsMeta>[]>("/menus", {
    params: {
      ...defaultFilters,
      ...filters,
    },
  });
  return response.data;
};

export const useMenus = (
  filters: MenuFilters,
  options?: { enabled?: boolean }
) => {
  return useQuery(
    menuKeys.menusFiltered({
      ...defaultFilters,
      ...filters,
    }),
    () => getMenus(filters),
    {
      enabled: options?.enabled,
    }
  );
};
