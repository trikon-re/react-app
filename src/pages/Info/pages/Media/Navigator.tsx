import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import { Menu, Tag } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "./routes/paths";
import { useGetMediaById } from "@/queries/media";

const items: MenuProps["items"] = [
  {
    label: "Overview",
    key: ROUTES.OVERVIEW,
    icon: <Icon icon="ph:book-open-duotone" className="text-xl" />,
  },
  {
    label: "Performance",
    key: ROUTES.PERFORMANCE,
    disabled: true,
    icon: <Icon icon="mdi:performance" className="text-xl" />,
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

  const { data } = useGetMediaById(params.id);
  console.log(params.id);

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between border-b">
        <div className="flex flex-row items-center justify-between gap-2 px-5 font-semibold text-text-light text-sm">
          <>
            <Icon icon="clarity:id-badge-solid" className="text-xl" />
            <p>
              Media /
              <>
                {" "}
                {data?.data?.data?.id}
                {data?.data?.data?.first_name?.[0]}
              </>
            </p>
          </>

          <Tag color={data?.data?.data?.is_active ? "#2ADBA4" : "grey"}>
            {data?.data?.data?.is_active ? "Active" : "Inactive"}
          </Tag>
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
