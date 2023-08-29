import { useDeleteMedia } from "@/queries/media";
import handleResponse from "@/utilities/handleResponse";
import { stringAvatar } from "@/utilities/stringAvatar";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IMedia } from "@pages/Media/types";
import { Dropdown, MenuProps, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MediaCard: React.FC<{ media: IMedia }> = ({ media }) => {
  const navigate = useNavigate();
  const { mutateAsync: deletemedia } = useDeleteMedia();

  const onDelete = async (fileName: number) => {
    message.open({
      type: "loading",
      content: "Deleting Media..",
      duration: 0,
    });
    const res = await handleResponse(() => deletemedia(media.id));
    message.destroy();
    if (res.status) {
      message.success("Media deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };
  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/media/${media.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      onClick: () => onDelete(media.id),
      key: 2,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];
  return (
    <>
      <ListItemButton
        className="hover:bg-[#F6FAFD] rounded-lg py-1 px-2 my-1 overflow-hidden items-start md:items-center gap-4"
        disableRipple
        disableTouchRipple
      >
        <Link to={`/app/info/media/${media.id}`}>
          <Avatar
            variant="rounded"
            src={media?.display_picture}
            {...stringAvatar(`${media?.first_name} ${media?.last_name}`)}
            className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-md mt-1"
          />
        </Link>
        <ListItemText
          primary={
            <>
              <Link
                to={`/app/info/media/${media.id}`}
                className="flex flex-row gap-2 items-center"
              >
                <p className="text-xl font-medium">{`${media?.first_name} ${media?.last_name}`}</p>
                <Icon icon="material-symbols:verified" color="#087890" />
              </Link>
            </>
          }
          secondary={
            <>
              <div className="flex flex-row items-center gap-1 py-1.5  text-text-light">
                <Icon className="text-lg" icon="material-symbols:person-pin" />
                <p className="text-sm font-semibold">Level 1 Media</p>
              </div>
              <div className="flex md:flex-row flex-col md:items-center md:gap-4  text-text-light">
                <div className="flex flex-row items-center gap-1">
                  <Icon className="text-lg" icon="ph:phone-light" />
                  <p className="text-sm font-medium">(+88) {media?.phone}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <Icon className="text-lg" icon="mdi-light:email" />

                  <p className="text-sm font-medium">{media?.email}</p>
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
          key={media?.id}
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
    </>
  );
};

export default MediaCard;
