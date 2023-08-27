import React from "react";
import Menu from "./components/Menu";
import { Avatar, IconButton, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";
import useUser from "@/hooks/useUser";
import { stringAvatar } from "@/utilities/stringAvatar";

const AppDrawer: React.FC = () => {
	const { first_name, last_name, role, id, display_picture } = useUser();
	return (
		<aside className="bg-background-light overflow-hidden rounded-md p-4 flex-[0.40] max-w-[300px] hidden lg:flex flex-col relative">
			<div className="flex-1 overflow-y-auto">
				<Menu mode="inline" />
			</div>
			<div
				className={
					"flex flex-row items-center gap-3 justify-between px-3 py-2 "
				}
			>
				<Avatar
					variant="rounded"
					src={display_picture}
					{...stringAvatar(`${first_name} ${last_name}`)}
					className="w-[47px] h-[47px] rounded-xl"
				/>
				<ListItemText
					primary={`${first_name} ${last_name}`}
					secondary={
						<>
							{role?.name} <br />
							{role?.id}
							{role?.name?.[0]}-{id}
						</>
					}
					primaryTypographyProps={{
						noWrap: true,
						className: "font-bold text-xs",
					}}
					secondaryTypographyProps={{
						noWrap: true,
						className: "text-[10px] leading-tight font-semibold",
					}}
				/>
				<IconButton color="secondary">
					<Icon icon={"solar:settings-bold-duotone"} />
				</IconButton>
			</div>
		</aside>
	);
};
export default AppDrawer;
