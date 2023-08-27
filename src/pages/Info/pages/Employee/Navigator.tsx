import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import { DatePicker, Input, Menu } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "./routes/paths";

const items: MenuProps["items"] = [
  {
    label: "Overview",
    key: ROUTES.OVERVIEW,
    icon: <Icon icon="openmoji:overview" className="text-xl" />,
  },
  {
    label: "Performance",
    key: ROUTES.PERFORMANCE,
    icon: <Icon icon="mdi:performance" className="text-xl" />,
  },
  {
    label: "Attendance",
    key: ROUTES.ATTENDANCE,
    icon: <Icon icon="ic:round-show-chart" className="text-xl" />,
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

  return (
    <>
      <div className="flex flex-row items-center justify-between border-b">
        <div className="flex flex-row items-center justify-between gap-2">
          <Icon icon="ic:twotone-person-pin" className="text-xl" />
          <p>
            employees/
            {params.id}
          </p>
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
          mode="horizontal"
          items={items}
          className={"border-b-0 w-full max-w-md"}
        />
      </div>
    </>
  );
};

export default Navigator;
