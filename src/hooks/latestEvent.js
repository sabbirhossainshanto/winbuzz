import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useLatestEvent = () => {
  return useQuery({
    queryKey: ["latestEvent"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.latestEvents, {
        type: "cup",
      });
      return data;
    },
  });
};
