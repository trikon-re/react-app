import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getProperties = (params: any) => {
  return instance.get(`/assets`, {
    params,
  });
};

export const useGetProperties = (params: any) => {
  return useQuery(["get-all-properties", params], () => getProperties(params));
};

const getPropertiesById = (id?: string) => {
  return instance.get(`/assets/${id}`);
};

export const useGetPropertiesById = (id?: string) => {
  return useQuery(
    ["get-all-properties-by-id", id],
    () => getPropertiesById(id),
    {
      enabled: !!id,
    }
  );
};
