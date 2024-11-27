import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Event } from "../types";
import eventKeys from "./queries";

export const getEvent = async (slug: string) => {
  const response = await axios.get<Event>("/events", {
    params: {
      slug: slug,
      timestamp: new Date().getTime(),
    },
  });
  return {
    ...response.data,
    image: (response.data.image || "").replace(
      "161.53.174.14",
      "www.sczg.unizg.hr"
    ),
  };
};

export const useEvent = (slug: string) => {
  return useQuery(eventKeys.event(slug), () => getEvent(slug));
};

export const getEvents = async () => {
  const response = await axios.get<Event[]>("/events", {
    params: {
      timestamp: new Date().getTime(),
    },
  });

  return response.data.map((event) => ({
    ...event,
    image: (event.image || "").replace("161.53.174.14", "www.sczg.unizg.hr"),
  }));
};

export const useEvents = () => {
  return useQuery(eventKeys.events, getEvents);
};

export const getNewEvents = async () => {
  const response = await axios.get<Event[]>("/events/new", {
    params: {
      timestamp: new Date().getTime(),
    },
  });

  return response.data.map((event) => ({
    ...event,
    image: (event.image || "").replace("161.53.174.14", "www.sczg.unizg.hr"),
  }));
};

export const useNewEvents = () => {
  return useQuery(eventKeys.newEvents, getNewEvents);
};

export const getSliderEvents = async () => {
  const response = await axios.get<Event[]>("/events/slider", {
    params: {
      timestamp: new Date().getTime(),
    },
  });

  return response.data.map((event) => ({
    ...event,
    image: (event.image || "").replace("161.53.174.14", "www.sczg.unizg.hr"),
  }));
};

export const useSliderEvents = () => {
  return useQuery(eventKeys.sliderEvents, getSliderEvents);
};

export const getCourses = async () => {
  const response = await axios.get<Event[]>("/events/courses", {
    params: {
      timestamp: new Date().getTime(),
    },
  });

  return response.data.map((event) => ({
    ...event,
    image: (event.image || "").replace("161.53.174.14", "www.sczg.unizg.hr"),
  }));
};

export const useCourses = () => {
  return useQuery(eventKeys.courses, getCourses);
};
