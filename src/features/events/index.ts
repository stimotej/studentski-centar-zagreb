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
  return response.data;
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

  return response.data;
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

  return response.data;
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

  return response.data;
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

  return response.data;
};

export const useCourses = () => {
  return useQuery(eventKeys.courses, getCourses);
};
