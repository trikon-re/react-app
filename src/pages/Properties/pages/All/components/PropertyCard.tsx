import React from "react";
import { stringAvatar } from "@/utilities/stringAvatar";
import { Icon } from "@iconify/react";
import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IProperty } from "@pages/Properties/types";

const PropertyCard: React.FC<{ property: IProperty }> = ({ property }) => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/property/${property.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      // onClick: () => onDelete(employee.id),
      key: 2,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];
  console.log(property);
  return (
    <ListItemButton
      className="hover:bg-[#e6f0f8] rounded-lg py-2 px-2 my-1 overflow-hidden items-start md:items-center gap-4"
      disableRipple
      disableTouchRipple
    >
      <div className="grid md:grid-cols-2 grid-cols-1 items-center flex-1">
        <div className="flex flex-row items-center flex-1">
          <Link to={`/app/info/property/${property.id}`}>
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
                  <div className="flex flex-row items-center">
                    {property?.type === "FLAT" ? (
                      <>
                        <Icon
                          className="text-xl"
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
                    <p className="text-sm font-semibold ">{property?.type}</p>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    {property?.size ? (
                      <>
                        <Icon
                          className="text-xl "
                          icon={"fluent:slide-size-20-regular"}
                        />
                        <p className="text-sm font-semibold">
                          {property?.size}
                        </p>
                        <p className="text-sm font-semibold lowercase ">
                          {property?.size_unit}
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
                    <p className="text-sm font-semibold">
                      {property?.media_id}
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
                      {property?.["address.area"]}, {property?.["address.city"]}
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
              {/* Assigned employee list */}
              <div className="flex flex-row items-center gap-2">
                <Icon
                  icon="mingcute:bed-fill"
                  className="text-2xl text-text-light"
                />
                <p className="text-sm font-semibold text-text-light">
                  {property?.["flat.num_bedroom"]}
                </p>
              </div>

              {/* Assigned permission list */}
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
  );
};

export default PropertyCard;
