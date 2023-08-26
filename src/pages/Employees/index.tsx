import { useGetEmployees } from "@/queries/employees";
import { usePaginate } from "@tam11a/react-use-hooks";
import {
  Button,
  DatePicker,
  Divider,
  Input,
  Menu,
  MenuProps,
  Select,
} from "antd";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IEmployees } from "./types";
const { RangePicker } = DatePicker;

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const items: MenuProps["items"] = [
  {
    label: "Overview",
    key: "overview",
  },
  {
    label: "Roles",
    key: "roles",
  },
  {
    label: "Employees",
    key: "employees",
  },
  {
    label: "Permission",
    key: "permission",
  },
];

const Employees: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetEmployees(getQueryParams());
  const [employees, setEmployees] = React.useState<any>([]);
  React.useEffect(() => {
    if (!data) return;
    setEmployees(data?.data?.data);
  }, [data]);
  console.log(employees);

  const [current, setCurrent] = useState("employees");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <div className="md:flex flex-row hidden">
        <div className="text-2xl font-bold p-3">Employees</div>
        <IconButton>
          <Icon icon="ic:baseline-plus" />
        </IconButton>
      </div>
      <div className="flex md:flex-row flex-col md:items-end justify-between my-5 border-b">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className="max-w-sm"
        />
        <RangePicker
          bordered={false}
          size={"large"}
          allowClear
          allowEmpty={[false, false]}
        />
      </div>

      <div className="flex md:flex-row flex-col-reverse md:items-center md:justify-between">
        <div className="flex flex-row items-center md:ml-4 mt-1">
          <Icon
            className="text-lg text-slate-600 m-1.5 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
            icon="lucide:arrow-down-up"
          />
          <h1 className="text-md font-bold text-slate-600 underline underline-offset-4 hidden md:inline">
            Sort by: {"  "}
          </h1>

          <Select
            bordered={false}
            className="w-40 text-text-dark font-semibold mt-0.5 mr-3"
            size="large"
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Newest",
                label: "Newest",
              },
              {
                value: "Last Updated",
                label: "Last Updated",
              },
            ]}
          />
          <div className="md:flex flex-row items-center hidden">
            <Icon
              className="text-lg text-slate-600 m-1.5 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text "
              icon="cil:filter"
            />
            <h1 className="text-md font-bold text-slate-600">Filter</h1>
          </div>
        </div>
        <Input
          className="font-semibold text-base"
          placeholder="Search..."
          style={{ width: 250 }}
          prefix={
            <Icon
              className="text-lg m-1.5 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
              icon="mingcute:search-3-line"
            />
          }
        />
      </div>
      <div>
        {employees?.map?.((s: IEmployees) => {
          return (
            <ListItemButton
              className="bg-slate-100 rounded-lg p-4 my-4 overflow-hidden items-center "
              // onClick={() => Navigate()}
            >
              <Avatar
                variant="rounded"
                {...stringAvatar(`${s?.first_name} ${s?.last_name}`)}
                className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-md mr-6 mt-1"
              />
              <ListItemText
                primary={
                  <>
                    {" "}
                    <p className="text-lg font-medium">{`${s?.first_name} ${s?.last_name}`}</p>
                  </>
                }
                secondary={
                  <>
                    <p className="text-sm font-bold">@{s?.username}</p>
                    {s?.role ? (
                      <div className="flex flex-row items-center gap-1">
                        <Icon
                          className="text-lg"
                          icon={"material-symbols:person-pin"}
                        />
                        <p className="text-sm font-medium">{s?.role?.name}</p>
                      </div>
                    ) : (
                      <p className="text-sm font-medium">No role assigned</p>
                    )}
                    <div className="md:flex md:flex-row flex-col md:items-center md:gap-4 hidden">
                      <div className="flex flex-row items-center gap-1">
                        <Icon className="text-lg" icon="ph:phone-light" />
                        <p className="text-sm font-medium">+88{s?.phone}</p>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <Icon className="text-lg" icon="mdi-light:email" />

                        <p className="text-sm font-medium">{s?.email}</p>
                      </div>
                    </div>
                  </>
                }
                className="p-0 m-0 "
                primaryTypographyProps={{
                  className: "text-xl font-medium",
                }}
                secondaryTypographyProps={{
                  variant: "caption",
                  className: " w-full ",
                }}
                key={s?.id}
              />
              <IconButton aria-label="delete">
                <Icon icon="ph:dots-three-outline-vertical" />
              </IconButton>
            </ListItemButton>
          );
        })}
      </div>
    </>
  );
};
export default Employees;
