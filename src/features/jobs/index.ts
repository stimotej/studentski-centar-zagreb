import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
import type { JobsMeta, Post } from "../types";
import jobKeys from "./queries";
import { jobsPageId } from "@/utils/constants";

export type JobsFilters = {
  categories?: number[];
  orderby?: string;
  order?: string;
  search?: string;
};

const jobsPerPage = 30;

export const getInfiniteJobs = async () => {
  const response = await axios.get<Post<JobsMeta>[]>("/jobs", {
    params: {
      per_page: jobsPerPage,
      timestamp: new Date().getTime(),
      allowed_sc: true,
      orderby: "date",
      search: "",
      categories: undefined,
      filter_by_date: true,
    },
  });
  return {
    data: response.data,
    totalPages: response.headers?.["x-wp-totalpages"],
  };
};

export const useJobs = (
  initialData: Post<JobsMeta>[],
  initialTotalPages: number,
  filters: JobsFilters
) => {
  const initialRun = useRef(true);

  useEffect(() => {
    initialRun.current = false;
  }, []);

  return useInfiniteQuery(
    jobKeys.jobsFiltered(filters),
    async ({ pageParam }) => {
      const response = await axios.get<Post<JobsMeta>[]>("/jobs", {
        params: {
          per_page: jobsPerPage,
          page: pageParam,
          timestamp: new Date().getTime(),
          allowed_sc: true,
          orderby: "featured",
          filter_by_date: true,
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

export const getJob = async (slug: string) => {
  const response = await axios.get<Post<JobsMeta>[]>("/jobs", {
    params: {
      slug: slug,
      timestamp: new Date().getTime(),
    },
  });
  return response.data[0] || null;
};

export const useJob = (slug: string) => {
  return useQuery(jobKeys.job(slug), () => getJob(slug));
};
const filters = {
  per_page: 6,
  orderby: "featured",
  order: "desc",
  allowed_sc: true,
  filter_by_date: true,
  timestamp: new Date().getTime(),
};

export const getJobsHome = async () => {
  const response = await axios.get<Post<JobsMeta>[]>("/jobs", {
    params: filters,
  });
  return response.data;
};

export const useJobsHome = (initialData?: Post<JobsMeta>[]) => {
  return useQuery(jobKeys.jobsHome, getJobsHome, { initialData });
};

export const getJobPage = async () => {
  const response = await axios.get<Post<JobsMeta>>(`/pages/${jobsPageId}`, {
    params: filters,
  });
  return response.data;
};

export const useJobPage = () => {
  return useQuery(jobKeys.jobPage, getJobPage);
};
