import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Banner } from "../types";
import bannerKeys from "./queries";

export const getBanners = async () => {
  const response = await axios.get<Banner[]>("/banners");
  return response.data;
};

export const useBanners = () => {
  return useQuery(bannerKeys.banners, () => getBanners());
};
