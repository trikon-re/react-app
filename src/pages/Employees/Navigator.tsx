import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import { DatePicker, Input, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EMPLOYEE_ROUTES } from "./routes/paths";

const items: MenuProps["items"] = [
	{
		label: "Create",
		key: EMPLOYEE_ROUTES.CREATE,
		icon: (
			<Icon
				icon="ic:twotone-lock-person"
				className="text-xl"
			/>
		),
	},
	{
		label: "List of Employees",
		key: EMPLOYEE_ROUTES.ROOT,
		icon: (
			<Icon
				icon="ic:twotone-person-pin"
				className="text-xl"
			/>
		),
	},
	{
		label: "Trash",
		key: EMPLOYEE_ROUTES.TRASH,
		icon: (
			<Icon
				icon="ic:twotone-lock-person"
				className="text-xl"
			/>
		),
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
		<>
			<div className="flex flex-col md:flex-row items-center justify-between gap-2 p-3">
				<h1 className="text-3xl font-bold">Employees</h1>
				<Input
					allowClear
					size="large"
					className="font-semibold max-w-xs"
					placeholder="Search..."
					prefix={
						<Icon
							className="text-2xl mr-2 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
							icon="mingcute:search-3-line"
						/>
					}
				/>
			</div>

			<div className="flex flex-col md:flex-row justify-between gap-2 border-b">
				<Menu
					onClick={onClick}
					selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
					mode="horizontal"
					items={items}
					className={"border-b-0 w-full max-w-md"}
				/>
				<DatePicker.RangePicker
					bordered={false}
					size={"large"}
					allowClear
					allowEmpty={[false, false]}
				/>
			</div>
		</>
	);
};

export default Navigator;
