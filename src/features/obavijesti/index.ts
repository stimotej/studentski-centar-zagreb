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

export const useObavijesti = (filters: ObavijestiFilters) => {
  const mediaPerPage = 30;
  const totalPages = useRef(0);

  return useInfiniteQuery(
    obavijestiKeys.obavijestiFiltered(filters),
    async ({ pageParam }) => {
      const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
        params: {
          per_page: mediaPerPage,
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

export const useObavijest = (slug: string) => {
  return useQuery(obavijestiKeys.obavijest(slug), async () => {
    const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti/", {
      params: {
        slug: slug,
      },
    });
    return response.data[0];
  });
};

const filters = {
  per_page: 6,
  orderby: "date",
  order: "desc",
};

export const getObavijesti = async () => {
  const response = await axios.get<Post<ObavijestiMeta>[]>("/obavijesti", {
    params: filters,
  });
  return response.data;
};

export const useObavijestiHome = () => {
  return useQuery(obavijestiKeys.obavijestiFiltered(filters), getObavijesti);
};
