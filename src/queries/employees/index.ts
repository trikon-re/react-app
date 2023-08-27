import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateEmployee } from "./types";

const getEmployees = (params: any) => {
  return instance.get(`/employees`);
};

export const useGetEmployees = (params: any) => {
  return useQuery(["get-all-employees", params], () => getEmployees(params));
};
const createEmployee = (data: ICreateEmployee) => {
  return instance.post("/employees", data);
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(createEmployee, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-employees"]),
  });
};
