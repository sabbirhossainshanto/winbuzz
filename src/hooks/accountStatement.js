import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useAccountStatement = (payload) => {
  return useQuery({
    queryKey: ["account-statement", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.accountStatement, payload);

      return data;
    },
    gcTime: 0,
  });
};

export const useAccountStatementMutation = () => {
  return useMutation({
    mutationKey: ["account-statement"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.accountStatement, payload);
      return data;
    },
  });
};
