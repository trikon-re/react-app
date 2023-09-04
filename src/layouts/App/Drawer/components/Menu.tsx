import React from "react";
import { Icon } from "@iconify/react";
import { Menu as AntMenu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  disabled?: boolean
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    disabled,
  } as MenuItem;
}

const items: MenuItem[] = [
  {
    type: "group",
    label: "Overview",
    children: [
      getItem("Dashboard", "/app", <Icon icon={"radix-icons:dashboard"} />),
      getItem(
        "My Leads",
        "/app/leads/my-leads",
        <Icon icon={"mdi:funnel-check-outline"} />,
        undefined,
        true
      ),
    ],
  },
  {
    type: "group",
    label: "Operations",
    children: [
      getItem("Leads", "/leads", <Icon icon={"iconamoon:funnel-light"} />, [
        getItem(
          "Overview",
          "/app/leads/overview",
          <Icon icon={"icon-park-outline:view-grid-list"} />,
          undefined,
          true
        ),
        getItem(
          "Create New Lead",
          "/app/create/lead",
          <Icon icon={"mdi:funnel-plus-outline"} />
        ),
        getItem(
          "List of Leads",
          "/app/leads",
          <Icon icon={"fluent:data-funnel-24-regular"} />,
          [
            getItem(
              "All Leads",
              "/app/leads",
              <Icon icon={"mdi:funnel-multiple-outline"} />
            ),
            getItem(
              "New Leads",
              "/app/leads/all?assign=null&total_assigned_persons=0",
              <Icon icon={"ic:outline-new-releases"} />,
              undefined,
              true
            ),
            getItem(
              "Pending Leads",
              "/app/leads/all?status=pending",
              <Icon icon={"ri:rest-time-line"} />,
              undefined,
              true
            ),
            getItem(
              "Complete Leads",
              "/app/leads/all?status=done",
              <Icon icon={"mdi:funnel-check-outline"} />,
              undefined,
              true
            ),
            getItem(
              "Canceled Leads",
              "/app/leads/all?status=canceled",
              <Icon icon={"mdi:funnel-remove-outline"} />,
              undefined,
              true
            ),
          ]
        ),
        getItem(
          "Trash",
          "/leads/trash",
          <Icon icon={"gg:trash"} />,
          undefined,
          true
        ),
        getItem(
          "Reports",
          "/app/leads/reports",
          <Icon icon={"tabler:report"} />,
          undefined,
          true
        ),
      ]),
      getItem("Properties", "/properties", <Icon icon={"mdi:building"} />, [
        getItem(
          "Overview",
          "/app/properties/overview",
          <Icon icon={"icon-park-outline:view-grid-list"} />,
          undefined,
          true
        ),
        getItem(
          "Create New Property",
          "/app/create/property",
          <Icon icon={"bi:building-add"} />,
          undefined
        ),
        getItem(
          "List of Properties",
          "/app/properties/all",
          <Icon icon={"fluent:data-funnel-24-regular"} />,
          [
            getItem(
              "All Properties",
              "/app/properties",
              <Icon icon={"bx:buildings"} />
            ),
            getItem(
              "New Properties",
              "/app/properties?date=last-7-days",
              <Icon icon={"ic:outline-new-releases"} />,
              undefined,
              true
            ),
            getItem(
              "Available Properties",
              "/app/properties?status=available",
              <Icon icon={"bi:building"} />,
              undefined,
              true
            ),
            getItem(
              "Sold Properties",
              "/app/properties?status=sold",
              <Icon icon={"bi:building-check"} />,
              undefined,
              true
            ),
            getItem(
              "Canceled Properties",
              "/app/properties?status=canceled",
              <Icon icon={"bi:building-x"} />,
              undefined,
              true
            ),
          ]
        ),
        getItem(
          "Trash",
          "/properties/trash",
          <Icon icon={"gg:trash"} />,
          undefined,
          true
        ),
        getItem(
          "Reports",
          "/app/properties/reports",
          <Icon icon={"tabler:report"} />,
          [],
          true
        ),
      ]),
      getItem("Media", "/media", <Icon icon={"radix-icons:dashboard"} />, [
        getItem(
          "Overview",
          "/app/media/overview",
          <Icon icon={"icon-park-outline:view-grid-list"} />,
          undefined,
          true
        ),
        getItem(
          "Create New Media",
          "/app/create/media",
          <Icon icon={"radix-icons:dashboard"} />
        ),
        getItem(
          "List of Media",
          "/app/media",
          <Icon icon={"radix-icons:dashboard"} />,
          [
            getItem(
              "All Media",
              "/app/media",
              <Icon icon={"radix-icons:dashboard"} />
            ),
            getItem(
              "Property Media",
              "/app/media?linked_to=property",
              <Icon icon={"radix-icons:dashboard"} />,
              undefined,
              true
            ),
            getItem(
              "Lead Media",
              "/app/media?linked_to=lead",
              <Icon icon={"radix-icons:dashboard"} />,
              undefined,
              true
            ),
          ]
        ),
        getItem(
          "Trash",
          "/app/media/trash",
          <Icon icon={"radix-icons:dashboard"} />,
          undefined,
          true
        ),
        getItem(
          "Reports",
          "/media/reports",
          <Icon icon={"radix-icons:dashboard"} />,
          [],
          true
        ),
      ]),
    ],
  },
  {
    type: "group",
    label: "Organization",
    children: [
      getItem(
        "Employees",
        "/app/employee",
        <Icon icon={"radix-icons:dashboard"} />,
        [
          getItem(
            "Create New Employee",
            "/app/create/employee",
            <Icon icon={"radix-icons:dashboard"} />
          ),
          getItem(
            "List of Employees",
            "/app/employees",
            <Icon icon={"radix-icons:dashboard"} />,
            [
              getItem(
                "All Employees",
                "/app/employees",
                <Icon icon={"radix-icons:dashboard"} />
              ),
              getItem(
                "New Employees",
                "/app/employees?join_date<7d",
                <Icon icon={"radix-icons:dashboard"} />,
                undefined,
                true
              ),
              getItem(
                "Active Employees",
                "/app/employees?active=true",
                <Icon icon={"radix-icons:dashboard"} />,
                undefined,
                true
              ),
              getItem(
                "Suspended Employees",
                "/app/employees?is_active=false",
                <Icon icon={"radix-icons:dashboard"} />,
                undefined,
                true
              ),
            ]
          ),
          getItem(
            "Trash",
            "/app/employees/trash",
            <Icon icon={"radix-icons:dashboard"} />
          ),
        ]
      ),
      getItem("Roles", "/app/role", <Icon icon={"radix-icons:dashboard"} />, [
        getItem(
          "Create New Role",
          "/app/create/role",
          <Icon icon={"radix-icons:dashboard"} />
        ),
        getItem(
          "List of Roles",
          "/app/roles",
          <Icon icon={"radix-icons:dashboard"} />,
          [
            getItem(
              "All Roles",
              "/app/roles",
              <Icon icon={"radix-icons:dashboard"} />
            ),
            getItem(
              "New Roles",
              "/app/roles?join_date<7d",
              <Icon icon={"radix-icons:dashboard"} />,
              undefined,
              true
            ),
            getItem(
              "Active Roles",
              "/app/roles?active=true",
              <Icon icon={"radix-icons:dashboard"} />,
              undefined,
              true
            ),
            getItem(
              "Suspended Roles",
              "/app/roles?is_active=false",
              <Icon icon={"radix-icons:dashboard"} />,
              undefined,
              true
            ),
          ]
        ),
        getItem(
          "Trash",
          "/app/roles/trash",
          <Icon icon={"radix-icons:dashboard"} />
        ),
      ]),
    ],
  },
];

type MenuMode = "inline" | "horizontal" | "vertical";

const Menu: React.FC<{ mode?: MenuMode }> = ({ mode = "inline" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AntMenu
        selectedKeys={[location.pathname]}
        mode={mode}
        items={items}
        onSelect={(info) => navigate(info.key)}
        className="relative border-none text-text-light font-semibold  [&_.ant-menu-item-selected]:bg-[#A8FFE4] [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text [&_.ant-menu-item-selected>.ant-menu-item-icon]:text-[#1A946E] [&_.ant-menu-item-icon]:text-xl"
      />
    </>
  );
};

export default Menu;
