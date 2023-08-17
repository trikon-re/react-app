import React from "react";
import Menu from "./components/Menu";

const AppDrawer: React.FC = () => {
	return (
		<aside className="bg-background-light overflow-y-auto overflow-x-hidden rounded-md p-4 flex-[0.40] max-w-[350px] hidden lg:inline">
			<Menu mode="inline" />
		</aside>
	);
};

export default AppDrawer;
