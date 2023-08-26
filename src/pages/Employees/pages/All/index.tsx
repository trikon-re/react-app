import { useGetEmployees } from "@/queries/employees";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import React from "react";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IEmployees } from "@pages/Employees/types";

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

const Employees: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetEmployees(getQueryParams());
  const [employees, setEmployees] = React.useState<any>([]);
  React.useEffect(() => {
    if (!data) return;
    setEmployees(data?.data?.data);
  }, [data]);
  console.log(employees);
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
      <div>
        {employees?.map?.((s: IEmployees) => {
          return (
            <ListItemButton
              className="bg-slate-100 rounded-lg p-4 my-4 overflow-hidden "
              // onClick={() => Navigate()}
            >
              <Avatar
                variant="rounded"
                {...stringAvatar(`${s?.first_name} ${s?.last_name}`)}
                className="w-[100px] h-[100px] rounded-md mr-6"
              />
              <ListItemText
                primary={`${s?.first_name} ${s?.last_name}`}
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
                    <div className="flex flex-row items-center gap-4">
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