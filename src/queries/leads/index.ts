import instance from "@/services";
import { ICreateLead } from "./type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createLead = (data: ICreateLead | any) => {
  return instance.post("/leads", data);
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation(createLead, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-leads"]),
  });
};

const getLeadStatus = (params: any) => {
  return instance.get(`/lead-status`, {
    params,
  });
};

export const useGetLeadStatus = (params: any) => {
  return useQuery(["get-all-lead-satatus", params], () =>
    getLeadStatus(params)
  );
};
