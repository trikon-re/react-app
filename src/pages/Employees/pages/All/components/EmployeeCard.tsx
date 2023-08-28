import React from "react";
import { stringAvatar } from "@/utilities/stringAvatar";
import { Icon } from "@iconify/react";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IEmployees } from "@pages/Employees/types";
import { Dropdown, MenuProps, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";

const EmployeeCard: React.FC<{ employee: IEmployees }> = ({ employee }) => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/employee/${employee.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      key: 2,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];

  return (
    <ListItemButton
      className="hover:bg-[#F6FAFD] rounded-lg py-1 px-2 my-1 overflow-hidden items-start md:items-center gap-4"
      disableRipple
      disableTouchRipple
    >
      <Link to={`/app/info/employee/${employee.id}`}>
        <Avatar
          variant="rounded"
          src={employee?.display_picture}
          {...stringAvatar(`${employee?.first_name} ${employee?.last_name}`)}
          className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-md mt-1"
        />
      </Link>
      <ListItemText
        primary={
          <>
            <Link to={`/app/info/employee/${employee.id}`}>
              <p className="text-lg font-medium">{`${employee?.first_name} ${employee?.last_name}`}</p>
            </Link>
          </>
        }
        secondary={
          <>
            <p className="text-sm font-bold">@{employee?.username}</p>
            {employee?.role ? (
              <div className="flex flex-row items-center gap-1">
                <Icon
                  className="text-lg"
                  icon={"material-symbols:person-pin"}
                />
                <p className="text-sm font-medium">{employee?.role?.name}</p>
              </div>
            ) : (
              <p className="text-sm font-medium">No role assigned</p>
            )}
            <div className="flex md:flex-row flex-col md:items-center md:gap-4">
              <div className="flex flex-row items-center gap-1">
                <Icon className="text-lg" icon="ph:phone-light" />
                <p className="text-sm font-medium">+88{employee?.phone}</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Icon className="text-lg" icon="mdi-light:email" />

                <p className="text-sm font-medium">{employee?.email}</p>
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
        key={employee?.id}
      />
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <IconButton>
              <Icon icon="ph:dots-three-outline-vertical" />
            </IconButton>
          </Space>
        </a>
      </Dropdown>
    </ListItemButton>
  );
};

export default EmployeeCard;
