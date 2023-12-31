import React from "react";
import Menu from "./components/Menu";
import { Avatar, IconButton, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";
import useUser from "@/hooks/useUser";
import { stringAvatar } from "@/utilities/stringAvatar";
import { Link } from "react-router-dom";

const AppDrawer: React.FC = () => {
  const { first_name, last_name, role, id, display_picture } = useUser();
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <Menu mode="inline" />
      </div>
      <div
        className={
          "flex flex-row items-center gap-3 justify-between px-3 py-2 "
        }
      >
        <Avatar
          variant="rounded"
          src={display_picture}
          {...stringAvatar(`${first_name} ${last_name}`)}
          className="w-[56px] h-[56px] rounded-xl"
        />
        <ListItemText
          primary={`${first_name} ${last_name}`}
          secondary={
            role ? (
              <>
                {role?.name} <br />
                {role?.id}
                {role?.name?.[0]}-{id}
              </>
            ) : (
              "No Role Assigned"
            )
          }
          primaryTypographyProps={{
            noWrap: true,
            className: "font-bold text-sm",
          }}
          secondaryTypographyProps={{
            noWrap: true,
            className: "text-xs leading-tight font-semibold",
          }}
        />
        <Link to={"/app/settings"}>
          <IconButton color="secondary">
            <Icon icon={"solar:settings-bold-duotone"} />
          </IconButton>
        </Link>
      </div>
    </>
  );
};
export default AppDrawer;
