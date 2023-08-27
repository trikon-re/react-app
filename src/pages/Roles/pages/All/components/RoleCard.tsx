import { stringAvatar } from "@/utilities/stringAvatar";
import { ClassNames } from "@emotion/react";
import { Icon } from "@iconify/react";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IRoles } from "@pages/Roles/types";
import { Tag } from "antd";
import React from "react";
import moment from "moment";

const RoleCard: React.FC<{ role: IRoles }> = ({ role }) => {
  return (
    <ListItemButton
      className="hover:bg-slate-50 rounded-lg py-2  my-2 overflow-hidden md:items-center items-start gap-4 "
      disableRipple
      disableTouchRipple
    >
      <div className="flex flex-col flex-1 md:flex-row md:items-center items-start justify-between">
        {/* Admin name */}
        <ListItemText
          primary={
            <div className="flex flex-row gap-2 ">
              <p className="text-lg font-medium">{role?.name}</p>
              <Tag color={`${role?.is_active ? "green" : "red"}`}>
                {role?.is_active ? "active" : "inactive"}
              </Tag>
            </div>
          }
          secondary={
            <>
              <p className="text-sm font-semibold text-text-light">
                @{role?.name}
              </p>
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

        <div className="flex flex-row md:items-center items-start justify-center gap-4 py-2 md:py-0 flex-1">
          {/* Assigned employee list */}
          <div className="flex flex-row  gap-2">
            <Icon
              icon="ic:twotone-person-pin"
              className="text-xl text-text-light"
            />
            <p className="text-sm font-semibold text-text-light">{`${role?.name}`}</p>
          </div>

          {/* Assigned permission list */}
          <div className="flex flex-row gap-2">
            <Icon
              icon="fluent-mdl2:permissions"
              className="text-xl text-text-light"
            />
            <p className="text-sm font-semibold text-text-light">{`${role?.name}`}</p>
          </div>
        </div>

        {/* last update */}

        <div className="w-fit">
          <p className="text-sm font-medium md:text-right text-text-light">
            Last updated
          </p>
          <p className="text-sm font-semibold md:text-right text-text-dark">
            {moment(role?.updated_at).calendar()}
          </p>
        </div>
      </div>

      <IconButton aria-label="delete">
        <Icon icon="ph:dots-three-outline-vertical" />
      </IconButton>
    </ListItemButton>
  );
};

export default RoleCard;
