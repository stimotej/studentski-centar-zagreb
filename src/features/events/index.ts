import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Event } from "../types";
import eventKeys from "./queries";

export const useEvent = (slug: string) => {
  return useQuery(eventKeys.event(slug), async () => {
    const response = await axios.get<Event>("/events/", {
      params: {
        slug: slug,
      },
    });
    return response.data;
  });
};

export const getEvents = async () => {
  const response = await axios.get<Event[]>("/events");

  return response.data;
};

export const useEvents = () => {
  return useQuery(eventKeys.events, getEvents);
};

export const getNewEvents = async () => {
  const response = await axios.get<Event[]>("/events/new");

  return response.data;
};

export const useNewEvents = () => {
  return useQuery(eventKeys.newEvents, getNewEvents);
};
