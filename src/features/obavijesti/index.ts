import {
  obavijestiCateringCategoryId,
  obavijestiEventiCategoryId,
  obavijestiPocetnaStranicaCategory,
  obavijestiTeatarTdCategoryId,
  obavijestiTurizamCategoryId,
  sliderCategoryId,
} from "@/utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
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
      filter_by_date: true,
      categories_exclude: [
        obavijestiPocetnaStranicaCategory,
        obavijestiTeatarTdCategoryId,
        obavijestiTurizamCategoryId,
        obavijestiEventiCategoryId,
        obavijestiCateringCategoryId,
      ],
    },
  });
  return {
    data: response.data,
    totalPages: response.headers?.["x-wp-totalpages"],
  };
};

export const useObavijesti = (
  initialData: Post<ObavijestiMeta>[],
  initialTotalPages: number,
  filters: ObavijestiFilters
) => {
  const initialRun = useRef(true);

  useEffect(() => {
    initialRun.current = false;
  }, []);

  return useInfiniteQuery(
    obavijestiKeys.obavijestiFiltered(filters),
    async ({ pageParam }) => {
      const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
        params: {
          per_page: postsPerPage,
          page: pageParam,
          timestamp: new Date().getTime(),
          filter_by_date: true,
          categories_exclude: [
            obavijestiPocetnaStranicaCategory,
            obavijestiTeatarTdCategoryId,
            obavijestiTurizamCategoryId,
            obavijestiEventiCategoryId,
            obavijestiCateringCategoryId,
          ],
          ...filters,
        },
      });
      return {
        data: response.data,
        totalPages: Number(response.headers?.["x-wp-totalpages"]),
      };
    },
    {
      initialData: initialRun.current
        ? {
            pageParams: [undefined, 1],
            pages: [
              {
                data: initialData,
                totalPages: initialTotalPages,
              },
            ],
          }
        : undefined,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length + 1 <= lastPage.totalPages) return pages.length + 1;
      },
    }
  );
};

export const getObavijest = async (slug: string) => {
  const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
    params: {
      slug: slug,
      timestamp: new Date().getTime(),
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
  filter_by_date: true,
  categories_exclude: [
    obavijestiPocetnaStranicaCategory,
    obavijestiTeatarTdCategoryId,
    obavijestiTurizamCategoryId,
    obavijestiEventiCategoryId,
    obavijestiCateringCategoryId,
  ],
  timestamp: new Date().getTime(),
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
      per_page: 100,
      orderby: "featured",
      order: "desc",
      filter_by_date: true,
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
      filter_by_date: true,
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
