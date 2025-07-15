import axios from "axios";
import type {
  Event,
  JobsMeta,
  ObavijestiMeta,
  Post,
  PostsMeta,
} from "../types";
import {
  infoPostsCategoryId,
  infoSmjestajDormitoriesCategory,
  restaurantsCategoryId,
} from "@/utils/constants";

export const getEventsPaths = async () => {
  const { data: events } = await axios.get<Event[]>("/events", {
    params: {
      per_page: 20,
      orderby: "date",
      order: "desc",
    },
  });

  return events;
};

export const getInformacijePaths = async () => {
  const { data: posts } = await axios.get<Post<PostsMeta>[]>("/posts", {
    params: {
      categories: [infoPostsCategoryId],
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
  });

  return posts;
};

export const getTecajeviPaths = async () => {
  const { data: events } = await axios.get<Event[]>("/events/courses", {
    params: {
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
  });

  return events;
};

export const getObavijestiPaths = async () => {
  const { data: obavijesti } = await axios.get<Post<ObavijestiMeta>[]>(
    "/obavijesti",
    {
      params: {
        per_page: 100,
        orderby: "featured",
        order: "desc",
      },
    }
  );

  return obavijesti;
};

export const getJobsPaths = async () => {
  const { data: jobs } = await axios.get<Post<JobsMeta>[]>("/jobs", {
    params: {
      per_page: 100,
      orderby: "featured",
      order: "desc",
    },
  });

  return jobs;
};

export const getRestaurantsPaths = async () => {
  const { data: posts } = await axios.get<Post<PostsMeta>[]>("/posts", {
    params: {
      categories: [restaurantsCategoryId],
      per_page: 100,
      orderby: "order",
      order: "desc",
    },
  });

  return posts;
};

export const getDomoviPaths = async () => {
  const { data: posts } = await axios.get<Post<PostsMeta>[]>("/posts", {
    params: {
      categories: [infoSmjestajDormitoriesCategory],
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
  });

  return posts;
};
