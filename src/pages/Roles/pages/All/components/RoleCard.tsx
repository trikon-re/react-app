import { Icon } from "@iconify/react";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import { IRoles } from "@pages/Roles/types";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDeleteRole } from "@/queries/roles";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";

const RoleCard: React.FC<{ role: IRoles }> = ({ role }) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteRole } = useDeleteRole();

  const onDelete = async () => {
    message.open({
      type: "loading",
      content: "Deleting Role..",
      duration: 0,
    });

    const res = await handleResponse(() => deleteRole({ id: role.id }));
    message.destroy();
    if (res.status) {
      message.success("Role deleted successfully!");
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
      deleteRole({
        id: role.id,
        params: {
          permanent: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Role deleted permanently!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };
  const onRestore = async () => {
    message.open({
      type: "loading",
      content: "Restoring Role..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteRole({
        id: role.id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Role restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/roles/${role.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      onClick: () => onDelete(),
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
      onClick: () => onPermaDel(),
      key: 4,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];
  return (
    <ListItemButton
      className="hover:bg-slate-50 rounded-lg py-2  my-2 overflow-hidden md:items-center items-start gap-4"
      disableRipple
      disableTouchRipple
    >
      {/* <div className="flex flex-row flex-1 md:flex-row md:items-center items-start justify-between"> */}
      <div className="grid md:grid-cols-3 grid-cols-1 justify-between items-center flex-1">
        {/* Admin name */}
        <ListItemText
          primary={
            <div className="flex flex-row gap-2 items-center ">
              <p className="text-lg font-medium">{role?.name}</p>
              <Tag color={`${role?.is_active ? "green" : "red"}`}>
                {role?.is_active ? "active" : "inactive"}
              </Tag>
            </div>
          }
          secondary={
            <>
              {role?.prefix ? (
                <p className="text-sm font-semibold text-text-light uppercase">
                  @{role?.prefix}
                </p>
              ) : (
                ""
              )}
              <p className="text-sm font-medium my-0.5">{role?.description}</p>
            </>
          }
          className="p-0 m-0 grow-0 flex-0"
          primaryTypographyProps={{
            className: "text-xl font-medium",
          }}
          secondaryTypographyProps={{
            variant: "caption",
            className: "w-full",
          }}
          key={role?.id}
        />

        <div className="flex flex-row md:items-center  md:gap-4 gap-2 py-2 md:py-0 ">
          {/* Assigned R0le list */}
          <div className="flex flex-row  gap-2">
            <Icon
              icon="ic:twotone-person-pin"
              className="text-xl text-text-light"
            />
            <p className="text-sm font-semibold text-text-light">
              {`${role?.total_employees}`} Roles
            </p>
          </div>

          {/* Assigned permission list */}
          <div className="flex flex-row gap-2">
            <Icon
              icon="fluent-mdl2:permissions"
              className="text-md text-text-light"
            />
            <p className="text-sm font-semibold text-text-light">
              {`${role?.total_permissions}`} Permissions
            </p>
          </div>
        </div>

        {/* last update */}

        <div className="flex flex-col md:items-end ">
          <p className="text-sm font-medium md:text-right text-text-light">
            Last updated
          </p>
          <p className="text-sm font-semibold md:text-right text-text-dark">
            {moment(role?.updated_at).calendar()}
          </p>
        </div>
      </div>

      <Dropdown menu={{ items: role?.deleted_at ? items2 : items }}>
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

export default RoleCard;
