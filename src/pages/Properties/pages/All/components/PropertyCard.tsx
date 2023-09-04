import React from "react";
import { stringAvatar } from "@/utilities/stringAvatar";
import { Icon } from "@iconify/react";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Dropdown, MenuProps, Space, Tag, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IProperty } from "@pages/Properties/types";
import { useGetMediaById } from "@/queries/media";
import { useDeleteProperty } from "@/queries/properties";
import handleResponse from "@/utilities/handleResponse";
import useAreYouSure from "@/hooks/useAreYouSure";

const PropertyCard: React.FC<{ property: IProperty }> = ({ property }) => {
  const navigate = useNavigate();
  const { data: mediaData } = useGetMediaById(property?.media_id);
  const { mutateAsync: deleteProperty } = useDeleteProperty();

  const onDelete = async () => {
    message.open({
      type: "loading",
      content: "Deleting Property..",
      duration: 0,
    });

    const res = await handleResponse(() => deleteProperty({ id: property.id }));
    message.destroy();
    if (res.status) {
      message.success("Property deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const onPermaDel = async () => {
    message.open({
      type: "loading",
      content: "Permanently Deleting Property..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteProperty({
        id: property.id,
        params: {
          permanent: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Property deleted permanently!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const { contextHolder: permaDelContextHolder, open } = useAreYouSure({
    title: "Delete Property Permanently?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });
  const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
    title: "Delete Property?",
    okText: "Delete",
    cancelText: "Cancel",
    color: "error",
  });

  const onRestore = async () => {
    message.open({
      type: "loading",
      content: "Restoring Property..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteProperty({
        id: property.id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Property restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/properties/${property.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      onClick: () =>
        delOpen(
          () => onDelete(),
          <>
            You are deleting a property.
            <br />
            <br />
            Deleting a property means the property will move to trash folder.
            After deleting, this work can't be undone. You'll have to restore
            the property to use again
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
            You are deleting a property permanently.
            <br />
            <br />
            Deleting a property permanently means the property won't be
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
        className="hover:bg-[#e6f0f8] rounded-lg py-2 px-2 my-1 overflow-hidden items-start md:items-center gap-4"
        disableRipple
        disableTouchRipple
      >
        <div className="grid md:grid-cols-2 grid-cols-1 items-center flex-1">
          <div className="flex flex-row items-center flex-1">
            <Link to={`/app/info/properties/${property.id}`}>
              <Avatar
                variant="rounded"
                // src={property?.display_picture}
                {...stringAvatar(
                  `${property?.["address.line1"]} ${property?.["address.line1"]}`
                )}
                className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-md mr-2"
              />
            </Link>
            <ListItemText
              primary={
                <>
                  <div className="flex flex-row jus gap-3">
                    <div className="flex flex-row items-center text-text">
                      {property?.type === "FLAT" ? (
                        <>
                          <Icon
                            className="text-xl text-text"
                            icon={"fluent:building-20-filled"}
                          />
                        </>
                      ) : property?.type === "LAND" ? (
                        <>
                          <Icon className="text-xl" icon={"mdi:island"} />
                        </>
                      ) : (
                        ""
                      )}
                      <p className="text-sm font-semibold capitalize">
                        {property?.type?.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      {property?.size ? (
                        <>
                          <Icon
                            className="text-xl text-text"
                            icon={"fluent:slide-size-20-regular"}
                          />
                          <p className="text-sm font-semibold text-text">
                            {property?.size}
                          </p>
                          <p className="text-sm font-semibold capitalize text-text ">
                            {property?.size_unit?.toLowerCase()}.
                          </p>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <Tag
                      color="#76C6D1"
                      className="rounded-xl w-fit text-center px-4"
                    >
                      {property?.type?.[0]}-{property?.id}
                    </Tag>
                  </div>
                </>
              }
              secondary={
                <>
                  {property?.media_id ? (
                    <div className="flex flex-row items-center gap-1 my-2">
                      <Icon
                        className="text-xl text-text-light"
                        icon={"tabler:address-book"}
                      />
                      <p className="text-sm font-semibold text-text-light">
                        {`${mediaData?.data?.data?.first_name} ${mediaData?.data?.data?.last_name}`}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold">No Media Assigned</p>
                  )}
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-1">
                      <Icon
                        className="text-xl text-text-light"
                        icon="solar:compass-big-bold"
                      />
                      <p className="text-sm font-semibold text-text-light">
                        {property?.["flat.facing_side"]}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <Icon
                        className="text-xl text-text-light"
                        icon="entypo:address"
                      />
                      <p className="text-sm font-semibold text-text-light">
                        {property?.["address.area"]},{" "}
                        {property?.["address.city"]}
                      </p>
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
              key={property?.id}
            />
          </div>

          {property?.type === "FLAT" ? (
            <>
              <div className="flex flex-row items-center gap-4 py-0 ">
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="mingcute:bed-fill"
                    className="text-2xl text-text-light"
                  />
                  <p className="text-sm font-semibold text-text-light">
                    {property?.["flat.num_bedroom"]}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="fa:bath" className="text-lg text-text-light" />
                  <p className="text-md font-semibold text-text-light">
                    {property?.["flat.num_bathroom"]}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <Dropdown menu={{ items: property?.deleted_at ? items2 : items }}>
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

export default PropertyCard;
