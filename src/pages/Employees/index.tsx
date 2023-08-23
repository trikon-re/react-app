import { useGetEmployees } from "@/queries/employees";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import React from "react";

const Employees: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetEmployees(getQueryParams());

  console.log(data);
  return (
    <>
      <div className="text-2xl font-bold p-3">Employees</div>
      <Input
        className="font-semibold text-base"
        placeholder="Search..."
        style={{ width: 250 }}
        prefix={
          <Icon
            className="text-2xl m-1.5 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
            icon="mingcute:search-3-line"
          />
        }
      />
    </>
  );
};
export default Employees;
