import instance from "@/services";
import { ICreateLead } from "./type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createLead = (data: ICreateLead | any) => {
  return instance.post("/leads", data);
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(createLead, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-leads"]),
  });
};
