import { stringAvatar } from "@/utilities/stringAvatar";
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

const RoleCard: React.FC<{ role: IRoles }> = ({ role }) => {
  return (
    <ListItemButton
      className="hover:bg-slate-50 rounded-lg py-5 px-2 my-2 overflow-hidden md:items-center items-start gap-"
      disableRipple
      disableTouchRipple
    >
      <ListItemText
        primary={
          <div className="flex flex-row gap-2">
            {" "}
            <p className="text-lg font-medium">{`${role?.name}`}</p>
            <div>
              {role?.is_active == true ? (
                <Tag className="align-super mt-0.5" color="green">
                  active
                </Tag>
              ) : (
                <Tag className="align-super mt-0.5" color="red">
                  inactive
                </Tag>
              )}
            </div>
          </div>
        }
        secondary={
          <>
            <p className="text-sm font-bold">{role?.description}</p>
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
        key={role?.id}
      />
      <IconButton aria-label="delete">
        <Icon icon="ph:dots-three-outline-vertical" />
      </IconButton>
    </ListItemButton>
  );
};

export default RoleCard;
