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
import handleResponse from "@/utilities/handleResponse";
import { useDeleteEmployee } from "@/queries/employees";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";

const EmployeeCard: React.FC<{ employee: IEmployees }> = ({ employee }) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteEmployee } = useDeleteEmployee();

  const onDelete = async () => {
    message.open({
      type: "loading",
      content: "Deleting Employee..",
      duration: 0,
    });
    const res = await handleResponse(() => deleteEmployee({ id: employee.id }));
    message.destroy();
    if (res.status) {
      message.success("Employee deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };
  const onPermaDel = async () => {
    message.open({
      type: "loading",
      content: "Permanently Deleting Role..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteEmployee({
        id: employee.id,
        params: {
          permanent: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Employee deleted permanently!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: permaDelContextHolder, open } = useAreYouSure({
    title: "Delete Employee Permanently?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });
  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Delete Employee?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });

  const onRestore = async () => {
    message.open({
      type: "loading",
      content: "Restoring Employee..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteEmployee({
        id: employee.id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Employee restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/employees/${employee.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      onClick: () =>
        delOpen(
          () => onDelete(),
          <>
            You are deleting a employee.
            <br />
            <br />
            Deleting a employee means the employee will move to trash folder.
            After deleting, this work can't be undone. You'll have to restore
            the employee to use again
          </>
        ),
      key: 2,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];
  const items2: MenuProps["items"] = [
    {
      label: "Restore",
      onClick: () => onRestore(),
      key: 3,
      icon: <Icon icon="ic:twotone-restore-page" className="text-xl " />,
      style: {
        color: "#319f7d",
      },
    },
    {
      label: "Delete Permanently",
      onClick: () =>
        open(
          () => onPermaDel(),
          <>
            You are deleting a employee permanently.
            <br />
            <br />
            Deleting a employee permanently means the employee won't be
            available in app any more. After deleting, this work can't be
            undone.
          </>
        ),
      key: 4,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];

  return (
    <>
      {permaDelContextHolder}
      {delContextHolder}
      <ListItemButton
        className="hover:bg-[#F6FAFD] rounded-lg py-1 px-2 my-1 overflow-hidden items-start md:items-center gap-4"
        disableRipple
        disableTouchRipple
      >
        <Link to={`/app/info/employees/${employee.id}`}>
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
              <div className="flex flex-row items-center">
                <Link to={`/app/info/employees/${employee.id}`}>
                  <p className="text-lg font-medium">{`${employee?.first_name} ${employee?.last_name}`}</p>
                </Link>
                <Icon
                  className="text-xl ml-1"
                  color={employee?.verified_at ? "#087890" : "grey"}
                  icon="ic:round-verified"
                />
              </div>
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
        <Dropdown menu={{ items: employee?.deleted_at ? items2 : items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <IconButton>
                <Icon icon="ph:dots-three-outline-vertical" />
              </IconButton>
            </Space>
          </a>
        </Dropdown>
      </ListItemButton>
    </>
  );
};

export default EmployeeCard;
