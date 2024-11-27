import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { CalendarEvent } from "../types";
import eventKeys from "./queries";

export const getCalendarEvents = async () => {
  const response = await axios.get<CalendarEvent[]>("/calendar", {
    params: {
      timestamp: new Date().getTime(),
    },
  });

  return response.data.map((event) => ({
    ...event,
    image: (event.image || "").replace("161.53.174.14", "www.sczg.unizg.hr"),
  }));
};

export const useCalendarEvents = (initialData?: CalendarEvent[]) => {
  return useQuery(eventKeys.calendar, getCalendarEvents, { initialData });
};
