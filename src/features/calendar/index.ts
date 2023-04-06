import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { CalendarEvent } from "../types";
import eventKeys from "./queries";

export const getCalendarEvents = async () => {
  const response = await axios.get<CalendarEvent[]>("/calendar");

  return response.data;
};

export const useCalendarEvents = (initialData?: CalendarEvent[]) => {
  return useQuery(eventKeys.calendar, getCalendarEvents, { initialData });
};
