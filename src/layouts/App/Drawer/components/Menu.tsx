import React from "react";
import { Icon } from "@iconify/react";
import { Menu as AntMenu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
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
        <Icon icon={"mdi:funnel-check-outline"} />
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
          <Icon icon={"icon-park-outline:view-grid-list"} />
        ),
        getItem(
          "Create New Lead",
          "/app/leads/create",
          <Icon icon={"mdi:funnel-plus-outline"} />
        ),
        getItem(
          "List of Leads",
          "/app/leads/all",
          <Icon icon={"fluent:data-funnel-24-regular"} />,
          [
            getItem(
              "All Leads",
              "/app/leads/all",
              <Icon icon={"mdi:funnel-multiple-outline"} />
            ),
            getItem(
              "New Leads",
              "/app/leads/all?assign=null&total_assigned_persons=0",
              <Icon icon={"ic:outline-new-releases"} />
            ),
            getItem(
              "Pending Leads",
              "/app/leads/all?status=pending",
              <Icon icon={"ri:rest-time-line"} />
            ),
            getItem(
              "Complete Leads",
              "/app/leads/all?status=done",
              <Icon icon={"mdi:funnel-check-outline"} />
            ),
            getItem(
              "Canceled Leads",
              "/app/leads/all?status=canceled",
              <Icon icon={"mdi:funnel-remove-outline"} />
            ),
          ]
        ),
        getItem("Trash", "/leads/trash", <Icon icon={"gg:trash"} />),
        getItem(
          "Reports",
          "/app/leads/reports",
          <Icon icon={"tabler:report"} />,
          []
        ),
      ]),
      getItem("Properties", "/properties", <Icon icon={"mdi:building"} />, [
        getItem(
          "Overview",
          "/app/properties/overview",
          <Icon icon={"icon-park-outline:view-grid-list"} />
        ),
        getItem(
          "Create New Property",
          "/app/properties/create",
          <Icon icon={"bi:building-add"} />
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
              "/app/properties/all?date=last-7-days",
              <Icon icon={"ic:outline-new-releases"} />
            ),
            getItem(
              "Available Properties",
              "/app/properties/all?status=available",
              <Icon icon={"bi:building"} />
            ),
            getItem(
              "Sold Properties",
              "/app/properties/all?status=sold",
              <Icon icon={"bi:building-check"} />
            ),
            getItem(
              "Canceled Properties",
              "/app/properties/all?status=canceled",
              <Icon icon={"bi:building-x"} />
            ),
          ]
        ),
        getItem("Trash", "/properties/trash", <Icon icon={"gg:trash"} />),
        getItem(
          "Reports",
          "/app/properties/reports",
          <Icon icon={"tabler:report"} />,
          []
        ),
      ]),
      getItem("Media", "/media", <Icon icon={"radix-icons:dashboard"} />, [
        getItem(
          "Overview",
          "/app/media/overview",
          <Icon icon={"icon-park-outline:view-grid-list"} />
        ),
        getItem(
          "Create New Media",
          "/app/media/create",
          <Icon icon={"radix-icons:dashboard"} />
        ),
        getItem(
          "List of Media",
          "/app/media/all",
          <Icon icon={"radix-icons:dashboard"} />,
          [
            getItem(
              "All Media",
              "/app/media/all",
              <Icon icon={"radix-icons:dashboard"} />
            ),
            getItem(
              "Property Media",
              "/app/media/all?linked_to=property",
              <Icon icon={"radix-icons:dashboard"} />
            ),
            getItem(
              "Lead Media",
              "/app/media/all?linked_to=lead",
              <Icon icon={"radix-icons:dashboard"} />
            ),
          ]
        ),
        getItem(
          "Trash",
          "/app/media/trash",
          <Icon icon={"radix-icons:dashboard"} />
        ),
        getItem(
          "Reports",
          "/media/reports",
          <Icon icon={"radix-icons:dashboard"} />,
          []
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
            "/app/employees/all",
            <Icon icon={"radix-icons:dashboard"} />,
            [
              getItem(
                "All Employees",
                "/app/employees",
                <Icon icon={"radix-icons:dashboard"} />
              ),
              getItem(
                "New Employees",
                "/app/employees/all?join_date<7d",
                <Icon icon={"radix-icons:dashboard"} />
              ),
              getItem(
                "Active Employees",
                "/app/employees/all?active=true",
                <Icon icon={"radix-icons:dashboard"} />
              ),
              getItem(
                "Suspended Employees",
                "/app/employees/all?is_active=false",
                <Icon icon={"radix-icons:dashboard"} />
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
          "/app/roles/all",
          <Icon icon={"radix-icons:dashboard"} />,
          [
            getItem(
              "All Roles",
              "/app/roles",
              <Icon icon={"radix-icons:dashboard"} />
            ),
            getItem(
              "New Roles",
              "/app/roles/all?join_date<7d",
              <Icon icon={"radix-icons:dashboard"} />
            ),
            getItem(
              "Active Roles",
              "/app/roles/all?active=true",
              <Icon icon={"radix-icons:dashboard"} />
            ),
            getItem(
              "Suspended Roles",
              "/app/roles/all?is_active=false",
              <Icon icon={"radix-icons:dashboard"} />
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

  return (
    <>
      <AntMenu
        defaultSelectedKeys={["/app"]}
        mode={mode}
        items={items}
        onSelect={(info) => navigate(info.key)}
        className="relative border-none text-text-light font-semibold  [&_.ant-menu-item-selected]:bg-[#A8FFE4] [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text [&_.ant-menu-item-selected>.ant-menu-item-icon]:text-[#1A946E] [&_.ant-menu-item-icon]:text-xl"
      />
    </>
  );
};

export default Menu;
