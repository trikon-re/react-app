import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateRole } from "./types";

const getRoles = (params: any) => {
  return instance.get(`/roles`);
};

export const useGetRoles = (params: any) => {
  return useQuery(["get-all-roles", params], () => getRoles(params));
};
const createRole = (data: ICreateRole) => {
  return instance.post("/roles", data);
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation(createRole, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-roles"]),
  });
};
