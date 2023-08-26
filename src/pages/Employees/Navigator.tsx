import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EMPLOYEE_ROUTES } from "./routes/paths";

const items: MenuProps["items"] = [
  {
    label: "Personal",
    key: EMPLOYEE_ROUTES.PERSONAL,
    icon: <Icon icon="ic:twotone-person-pin" className="text-xl" />,
  },
  {
    label: "Security",
    key: EMPLOYEE_ROUTES.CREATE,
    icon: <Icon icon="ic:twotone-lock-person" className="text-xl" />,
  },
  {
    label: "Session",
    key: EMPLOYEE_ROUTES.SESSION,
    icon: <Icon icon="ic:twotone-lock-person" className="text-xl" />,
  },
];

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
      mode="horizontal"
      items={items}
      className={"mb-1"}
    />
  );
};

export default Navigator;
