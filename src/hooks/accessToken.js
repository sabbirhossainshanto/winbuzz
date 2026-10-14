import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useAccessToken = (payload) => {
  return useQuery({
    queryKey: ["access-token", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.accessToken, payload);
      return data;
    },
    gcTime: 0,
  });
};
