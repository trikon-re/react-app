import React from "react";
import useUser from "@/hooks/useUser";
import { Avatar, ListItemText } from "@mui/material";
import { Tag } from "antd";
const UserInfo = () => {
  const user = useUser();

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
  console.log(user);
  return (
    <>
      <Avatar
        variant="rounded"
        {...stringAvatar(`${user?.first_name} ${user?.last_name}`)}
        className="w-[174px] h-[174px] rounded-[30px]"
      />
      <ListItemText
        primary={`${user?.first_name} ${user?.last_name}`}
        secondary={
          <>
            {user?.role?.name} <br />@{user?.username}
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
          className: "font-medium text-3xl text-text-dark",
        }}
        secondaryTypographyProps={{
          noWrap: true,
          className: "text-sm leading-tight font-medium text-text-light",
        }}
      />
      <Tag prefix="icon={<LinkedinOutlined />}">Verified</Tag>
    </>
  );
};

export default UserInfo;
