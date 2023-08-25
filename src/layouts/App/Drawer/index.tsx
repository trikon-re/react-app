import React from "react";
import Menu from "./components/Menu";
import { Avatar, IconButton, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";
import useUser from "@/hooks/useUser";

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

const AppDrawer: React.FC = () => {
  const { first_name, last_name, role, id } = useUser();
  return (
    <aside className="bg-background-light overflow-y-auto overflow-x-hidden rounded-md p-4 flex-[0.40] max-w-[350px] hidden lg:inline">
      <Menu mode="inline" />
      <div
        className={
          "flex flex-row items-center gap-3 justify-between px-3 py-2 "
        }
      >
        <Avatar
          variant="rounded"
          {...stringAvatar(`${first_name} ${last_name}`)}
          className="w-[47px] h-[47px] rounded-xl"
        />
        <ListItemText
          primary={`${first_name} ${last_name}`}
          secondary={
            <>
              {role?.name} <br />
              {role?.id}
              {role?.name?.[0]}-{id}
            </>
          }
          primaryTypographyProps={{
            noWrap: true,
            className: "font-bold text-xs",
          }}
          secondaryTypographyProps={{
            noWrap: true,
            className: "text-[10px] leading-tight font-semibold",
          }}
        />
        <IconButton color="secondary">
          <Icon icon={"solar:settings-bold-duotone"} />
        </IconButton>
      </div>
    </aside>
  );
};

export default AppDrawer;
