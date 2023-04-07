import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Post, PostsMeta } from "../types";
import postsKeys from "./queries";

export type PostsFilters = {
  categories?: number[];
  orderby?: string;
  order?: string;
  search?: string;
  slug?: string;
};

export const getPost = async (slug: string) => {
  const response = await axios.get<Post<PostsMeta>[]>("/posts", {
    params: {
      slug: slug,
    },
  });
  return response.data[0];
};

export const usePost = (slug: string) => {
  return useQuery(postsKeys.post(slug), () => getPost(slug));
};

interface FiltersType {
  categories?: number[];
  include?: number[];
  orderby?: string;
  order?: string;
}

const defaultFilters = {
  per_page: 100,
  orderby: "date",
  order: "asc",
};

export const getPosts = async (filters?: FiltersType) => {
  const response = await axios.get<Post<PostsMeta>[]>("/posts", {
    params: {
      ...defaultFilters,
      ...filters,
    },
  });
  return response.data;
};

export const usePosts = (filters?: FiltersType) => {
  return useQuery(postsKeys.postsFiltered(filters || {}), () =>
    getPosts(filters)
  );
};
