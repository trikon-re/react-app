import React from "react";

import { Icon, InlineIcon } from "@iconify/react";

import type { MenuProps } from "antd";
import { Breadcrumb, Menu } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "./routes/paths";
import { useGetRoleById } from "@/queries/roles";

const items: MenuProps["items"] = [
	{
		label: "Overview",
		key: ROUTES.OVERVIEW,
		icon: <Icon icon="ph:book-open-duotone" />,
	},
	{
		label: "Permissions",
		key: ROUTES.PERMISSIONS,
		icon: <Icon icon="fluent-mdl2:permissions" />,
	},
];

const Navigator: React.FC = () => {
	// To get the params
	const params = useParams<{ id: string }>();

	const { data, isError, isLoading } = useGetRoleById(params.id);

	// To get the current location pathname
	let location = useLocation();
	// const params = useParams();

	// To route
	const navigate = useNavigate();
	const onClick: MenuProps["onClick"] = (e) => {
		navigate(e.key);
	};

	React.useEffect(() => {
		if (isError) {
			navigate("/app/404", { replace: true });
		}
	}, [isError]);

	return (
		<>
			<div className="flex sm:flex-row flex-col sm:items-center items-start justify-between border-b sm:pl-4">
				<span className="sm:flex flex-row gap-2 flex-1 hidden">
					<InlineIcon
						icon="clarity:id-badge-solid"
						className="text-xl text-text"
					/>
					<Breadcrumb className="font-medium text-text-light">
						<Breadcrumb.Item href="/app/roles">Role</Breadcrumb.Item>
						<Breadcrumb.Item>
							{isLoading ? params.id : data?.data?.data?.name}
						</Breadcrumb.Item>
					</Breadcrumb>
				</span>
				<Menu
					onClick={onClick}
					selectedKeys={[location.pathname?.split?.("/")[5] || ""]}
					mode="horizontal"
					items={items}
					className={"border-b-0 w-fit min-w-[320px] max-w-md"}
				/>
			</div>
		</>
	);
};

export default Navigator;
