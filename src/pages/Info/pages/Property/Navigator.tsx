import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "./routes/paths";
import { useGetPropertiesById } from "@/queries/properties";

const items: MenuProps["items"] = [
  {
    label: "Overview",
    key: ROUTES.OVERVIEW,
    icon: <Icon icon="ph:book-open-duotone" className="text-xl" />,
  },
];

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();
  const params = useParams();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const { data } = useGetPropertiesById(params.id);

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between border-b">
        <div className="flex flex-row items-center justify-between gap-2 px-5 font-semibold text-text-light text-sm">
          <>
            <Icon icon="clarity:id-badge-solid" className="text-xl" />
            <p>
              property / {data?.data?.data?.type?.[0]}-{data?.data?.data?.id}
            </p>
          </>
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname?.split?.("/")[5] || ""]}
          mode="horizontal"
          items={items}
          className={"border-b-0 w-full max-w-md"}
        />
      </div>
    </>
  );
};

export default Navigator;
