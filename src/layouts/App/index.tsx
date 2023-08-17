import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

const AppDrawer = lazy(() => import("./Drawer"));

const AppLayout: React.FC = () => {
	return (
		<>
			<div className="bg-background flex flex-row gap-6 p-6 h-screen ">
				<AppDrawer />
				<main className="flex-1 bg-background-light overflow-y-auto overflow-x-hidden rounded-md p-4">
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default AppLayout;
