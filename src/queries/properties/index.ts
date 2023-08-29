import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getProperties = (params: any) => {
  return instance.get(`/assets`, {
    params,
  });
};

export const useGetProperties = (params: any) => {
  return useQuery(["get-all-Properties", params], () => getProperties(params));
};
