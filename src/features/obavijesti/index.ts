import { sliderCategoryId } from "@/utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import type { ObavijestiMeta, Post } from "../types";
import obavijestiKeys from "./queries";

export type ObavijestiFilters = {
  categories?: number[];
  orderby?: string;
  order?: string;
  search?: string;
  slug?: string;
};

const postsPerPage = 30;

export const getInfiniteObavijesti = async () => {
  const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
    params: {
      per_page: postsPerPage,
      timestamp: new Date().getTime(),
      search: "",
      categories: undefined,
    },
  });
  return response.data;
};

export const useObavijesti = (filters: ObavijestiFilters) => {
  const totalPages = useRef(0);

  return useInfiniteQuery(
    obavijestiKeys.obavijestiFiltered(filters),
    async ({ pageParam }) => {
      const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
        params: {
          per_page: postsPerPage,
          page: pageParam,
          timestamp: new Date().getTime(),
          ...filters,
        },
      });
      totalPages.current = response.headers?.["x-wp-totalpages"];
      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length + 1 <= totalPages.current) return pages.length + 1;
      },
    }
  );
};

export const getObavijest = async (slug: string) => {
  const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
    params: {
      slug: slug,
    },
  });
  return response.data[0];
};

export const useObavijest = (slug: string) => {
  return useQuery(obavijestiKeys.obavijest(slug), () => getObavijest(slug));
};

const filters = {
  per_page: 6,
  orderby: "date",
  order: "desc",
};

export const getObavijestiHome = async () => {
  const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
    params: filters,
  });
  return response.data;
};

export const useObavijestiHome = (initialData?: Post<ObavijestiMeta>[]) => {
  return useQuery(obavijestiKeys.homeObavijesti, getObavijestiHome, {
    initialData,
  });
};

export const getObavijestiPage = async (category: number) => {
  const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
    params: {
      per_page: 4,
      orderby: "featured",
      order: "desc",
      categories: [category],
    },
  });
  return response.data;
};

export const useObavijestiPage = (category: number) => {
  return useQuery(
    obavijestiKeys.obavijestiFiltered({ categories: [category] }),
    () => getObavijestiPage(category)
  );
};

export const getSliderObavijesti = async () => {
  const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
    params: {
      categories: [sliderCategoryId],
    },
  });
  return response.data;
};

export const useSliderObavijesti = (initialData?: Post<ObavijestiMeta>[]) => {
  return useQuery(obavijestiKeys.sliderObavijesti, getSliderObavijesti, {
    initialData,
  });
};
