import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../utils";

export const useFetchTasks = () => {
  // Abfragen
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  return { isLoading, data, error };
};
