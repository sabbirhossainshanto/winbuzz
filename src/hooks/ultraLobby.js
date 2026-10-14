import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useUltraLobbyQuery = () => {
  return useQuery({
    queryKey: ["ultraLobby"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.ultraLobby}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
