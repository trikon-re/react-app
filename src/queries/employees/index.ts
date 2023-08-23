import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getEmployees = (params: any) => {
  return instance.get(`/employees`);
};

export const useGetEmployees = (params: any) => {
  return useQuery(["get-all-employees", params], () => getEmployees(params));
};
