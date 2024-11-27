import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Banner } from "../types";
import bannerKeys from "./queries";

export const getBanners = async () => {
  const response = await axios.get<Banner[]>("/banners", {
    params: {
      timestamp: new Date().getTime(),
    },
  });
  return response.data.map((banner) => ({
    ...banner,
    image_url: (banner.image_url || "").replace(
      "161.53.174.14",
      "www.sczg.unizg.hr"
    ),
  }));
};

export const useBanners = () => {
  return useQuery(bannerKeys.banners, getBanners);
};
