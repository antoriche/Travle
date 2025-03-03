import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getAPI } from "../services/api";
import { HelloRequest, HelloResponse } from "shared/Hello";
import { queryClient } from "../App";

export const getHello_ = async (name: string): Promise<HelloResponse> => {
  const api = await getAPI();
  const res = await api.get<HelloResponse>("/hello", { params: { name } as HelloRequest });
  return res.data;
};

export const useHello = (name: string) => useQuery({ queryKey: ["hello", name], queryFn: () => getHello_(name) });
export const getHello = (name: string) => queryClient.fetchQuery({ queryKey: ["hello", name], queryFn: () => getHello_(name) });
