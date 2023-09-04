import useAreYouSure from "@/hooks/useAreYouSure";
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
  const { mutateAsync: deleteMedia } = useDeleteMedia();

  const onDelete = async () => {
    message.open({
      type: "loading",
      content: "Deleting Media..",
      duration: 0,
    });
    const res = await handleResponse(() => deleteMedia({ id: media.id }));
    message.destroy();
    if (res.status) {
      message.success("Media deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const onPermaDel = async () => {
    message.open({
      type: "loading",
      content: "Permanently Deleting Media..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteMedia({
        id: media.id,
        params: {
          permanent: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Media deleted permanently!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: permaDelContextHolder, open } = useAreYouSure({
    title: "Delete Media Permanently?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });
  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Delete Media?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });

  const onRestore = async () => {
    message.open({
      type: "loading",
      content: "Restoring Media..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteMedia({
        id: media.id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Media restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/medias/${media.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      onClick: () =>
        delOpen(
          () => onDelete(),
          <>
            You are deleting a media.
            <br />
            <br />
            Deleting a media means the media will move to trash folder. After
            deleting, this work can't be undone. You'll have to restore the
            media to use again
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
            You are deleting a media permanently.
            <br />
            <br />
            Deleting a media permanently means the media won't be available in
            app any more. After deleting, this work can't be undone.
          </>
        ),
      key: 4,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];
  return (
    <>
      {delContextHolder}
      {permaDelContextHolder}
      <ListItemButton
        className="hover:bg-[#F6FAFD] rounded-lg py-1 px-2 my-1 overflow-hidden items-start md:items-center gap-4"
        disableRipple
        disableTouchRipple
      >
        <Link to={`/app/info/medias/${media.id}`}>
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
                to={`/app/info/medias/${media.id}`}
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
        <Dropdown menu={{ items: media?.deleted_at ? items2 : items }}>
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
