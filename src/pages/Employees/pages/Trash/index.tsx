import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import EmployeeCard from "../All/components/EmployeeCard";
import { useGetEmployees } from "@/queries/employees";
import { IEmployees } from "@pages/Employees/types";

const Roles: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetEmployees({ ...getQueryParams(), trash: true });
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
      </div>
    </>
  );
};
export default Roles;
