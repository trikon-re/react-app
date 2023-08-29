import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import {
  // DatePicker,
  Menu,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EMPLOYEE_ROUTES } from "./routes/paths";

import { Input, Select } from "antd";
import { InlineIcon } from "@iconify/react";

import useSearchParamsPaginate from "@/hooks/useSearchParamsPaginate";

const items: MenuProps["items"] = [
  {
    label: "List of Employees",
    key: EMPLOYEE_ROUTES.ROOT,
    icon: <Icon icon="ic:twotone-person-pin" className="text-xl" />,
  },
  {
    label: "Trash",
    key: EMPLOYEE_ROUTES.TRASH,
    icon: <Icon icon="mdi:trash-can-outline" className="text-xl" />,
  },
];

const Navigator: React.FC = () => {
  // To get the current location pathname

  let location = useLocation();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const { search, setSearch } = useSearchParamsPaginate();

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 p-3 text-text">
        <h1 className="text-2xl md:text-3xl font-bold">Employees</h1>
        <Link
          to={"/app/create/employee"}
          className="text-sm font-bold underline"
        >
          Create <span className="hidden md:inline">Employee</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-2 border-b">
        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
          mode="horizontal"
          items={items}
          className={"border-b-0 w-full max-w-md"}
        />
        {/* <DatePicker.RangePicker
          bordered={false}
          size={"large"}
          allowClear
          allowEmpty={[false, false]}
        /> */}
      </div>

      <div className="flex flex-row items-center justify-between gap-2 p-3 mt-2">
        <Input
          allowClear
          size="large"
          className="font-semibold max-w-[220px]"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            console.log("triggering");
            setSearch(e.target.value || "");
          }}
          prefix={
            <Icon
              className="text-2xl mr-1 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
              icon="mingcute:search-3-line"
            />
          }
        />
        <div className="flex flex-row items-center">
          <p className="font-semibold text-sm underline flex items-center gap-1">
            <InlineIcon icon={"pepicons-pencil:down-up"} className="text-xl" />{" "}
            Sort By:
          </p>
          <Select
            defaultValue="created_at"
            bordered={false}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            options={[
              { value: "-created_at", label: "Newest" },
              { value: "-updated_at", label: "Last Updated" },
              { value: "created_at", label: "Oldest" },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Navigator;
