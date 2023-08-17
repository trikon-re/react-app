import React from "react";
import { Icon } from "@iconify/react";
import { Menu as AntMenu, MenuProps } from "antd";

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
				"/leads/my-leads",
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
					"/leads/overview",
					<Icon icon={"icon-park-outline:view-grid-list"} />
				),
				getItem(
					"Create New Lead",
					"/leads/create",
					<Icon icon={"mdi:funnel-plus-outline"} />
				),
				getItem(
					"List of Leads",
					"/leads/all",
					<Icon icon={"fluent:data-funnel-24-regular"} />,
					[
						getItem(
							"All Leads",
							"/leads/all",
							<Icon icon={"mdi:funnel-multiple-outline"} />
						),
						getItem(
							"New Leads",
							"/leads/all?assign=null&total_assigned_persons=0",
							<Icon icon={"ic:outline-new-releases"} />
						),
						getItem(
							"Pending Leads",
							"/leads/all?status=pending",
							<Icon icon={"ri:rest-time-line"} />
						),
						getItem(
							"Complete Leads",
							"/leads/all?status=done",
							<Icon icon={"mdi:funnel-check-outline"} />
						),
						getItem(
							"Canceled Leads",
							"/leads/all?status=canceled",
							<Icon icon={"mdi:funnel-remove-outline"} />
						),
					]
				),
				getItem("Trash", "/leads/trash", <Icon icon={"gg:trash"} />),
				getItem(
					"Reports",
					"/leads/reports",
					<Icon icon={"tabler:report"} />,
					[]
				),
			]),
			getItem("Properties", "/properties", <Icon icon={"mdi:building"} />, [
				getItem(
					"Overview",
					"/properties/overview",
					<Icon icon={"icon-park-outline:view-grid-list"} />
				),
				getItem(
					"Create New Property",
					"/properties/create",
					<Icon icon={"bi:building-add"} />
				),
				getItem(
					"List of Properties",
					"/properties/all",
					<Icon icon={"fluent:data-funnel-24-regular"} />,
					[
						getItem(
							"All Properties",
							"/properties/all",
							<Icon icon={"bx:buildings"} />
						),
						getItem(
							"New Properties",
							"/properties/all?date=last-7-days",
							<Icon icon={"ic:outline-new-releases"} />
						),
						getItem(
							"Available Properties",
							"/properties/all?status=available",
							<Icon icon={"bi:building"} />
						),
						getItem(
							"Sold Properties",
							"/properties/all?status=sold",
							<Icon icon={"bi:building-check"} />
						),
						getItem(
							"Canceled Properties",
							"/properties/all?status=canceled",
							<Icon icon={"bi:building-x"} />
						),
					]
				),
				getItem("Trash", "/properties/trash", <Icon icon={"gg:trash"} />),
				getItem(
					"Reports",
					"/properties/reports",
					<Icon icon={"tabler:report"} />,
					[]
				),
			]),
			getItem("Media", "/media", <Icon icon={"radix-icons:dashboard"} />, [
				getItem(
					"Overview",
					"/media/overview",
					<Icon icon={"icon-park-outline:view-grid-list"} />
				),
				getItem(
					"Create New Media",
					"/media/create",
					<Icon icon={"radix-icons:dashboard"} />
				),
				getItem(
					"List of Media",
					"/media/all",
					<Icon icon={"radix-icons:dashboard"} />,
					[
						getItem(
							"All Media",
							"/media/all",
							<Icon icon={"radix-icons:dashboard"} />
						),
						getItem(
							"Property Media",
							"/media/all?linked_to=property",
							<Icon icon={"radix-icons:dashboard"} />
						),
						getItem(
							"Lead Media",
							"/media/all?linked_to=lead",
							<Icon icon={"radix-icons:dashboard"} />
						),
					]
				),
				getItem(
					"Trash",
					"/media/trash",
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
				"/employees",
				<Icon icon={"radix-icons:dashboard"} />,
				[
					getItem(
						"Create New Employee",
						"/employees/create",
						<Icon icon={"radix-icons:dashboard"} />
					),
					getItem(
						"List of Employees",
						"/employees/all",
						<Icon icon={"radix-icons:dashboard"} />,
						[
							getItem(
								"All Employees",
								"/employees/all",
								<Icon icon={"radix-icons:dashboard"} />
							),
							getItem(
								"New Employees",
								"/employees/all?join_date<7d",
								<Icon icon={"radix-icons:dashboard"} />
							),
							getItem(
								"Active Employees",
								"/employees/all?active=true",
								<Icon icon={"radix-icons:dashboard"} />
							),
							getItem(
								"Suspended Employees",
								"/employees/all?is_active=false",
								<Icon icon={"radix-icons:dashboard"} />
							),
						]
					),
					getItem(
						"Trash",
						"/employees/trash",
						<Icon icon={"radix-icons:dashboard"} />
					),
				]
			),
			getItem("Roles", "/roles", <Icon icon={"radix-icons:dashboard"} />, [
				getItem(
					"Create New Role",
					"/roles/create",
					<Icon icon={"radix-icons:dashboard"} />
				),
				getItem(
					"List of Roles",
					"/overview",
					<Icon icon={"radix-icons:dashboard"} />
				),
				getItem(
					"Trash",
					"/employees/trash",
					<Icon icon={"radix-icons:dashboard"} />
				),
			]),
		],
	},
];

type MenuMode = "inline" | "horizontal" | "vertical";

const Menu: React.FC<{ mode?: MenuMode }> = ({ mode = "inline" }) => {
	return (
		<>
			<AntMenu
				defaultSelectedKeys={["/app"]}
				mode={mode}
				items={items}
				onSelect={(info) => console.log(info)}
				className="border-none text-text-light font-semibold  [&_.ant-menu-item-selected]:bg-[#A8FFE4] [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text [&_.ant-menu-item-selected>.ant-menu-item-icon]:text-[#1A946E] [&_.ant-menu-item-icon]:text-xl"
			/>
		</>
	);
};

export default Menu;
