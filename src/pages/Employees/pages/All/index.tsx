import { useGetEmployees } from "@/queries/employees";
import React from "react";
import { IEmployees } from "@pages/Employees/types";
import EmployeeCard from "./components/EmployeeCard";
import useSearchParamsPaginate from "@/hooks/useSearchParamsPaginate";
import { Pagination } from "antd";

const Employees: React.FC = () => {
  const { page, setPage, getQueryParams, limit, setLimit } =
    useSearchParamsPaginate();

  const { data } = useGetEmployees(getQueryParams());
  const [employees, setEmployees] = React.useState<any>([]);

  React.useEffect(() => {
    if (!data) return;
    setEmployees(data?.data?.data);
  }, [data]);

  return (
    <>
      <div className="py-2">
        {employees?.map?.((s: IEmployees) => (
          <EmployeeCard employee={s} key={s.id} />
        ))}

        <div className="flex flex-row justify-end">
          <Pagination
            total={data?.data?.total}
            onChange={(p, ps) => {
              setPage(p);
              setLimit(ps);
            }}
            current={page}
            pageSize={limit}
            showSizeChanger
            pageSizeOptions={[2, 5, 10, 20, 50, 100, 500]}
          />
        </div>
      </div>
    </>
  );
};
export default Employees;
