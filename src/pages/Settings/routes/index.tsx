import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { resRoutes } from "./settingRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const RestaurantRoutes: React.FC = () => {
	return (
		<Routes>
			{resRoutes?.map?.(({ path, Component }) => (
				<Route
					key={path}
					path={path}
					element={
						<Suspense fallback={<NProgressSuspense />}>
							<Component />
						</Suspense>
					}
				/>
			))}
		</Routes>
	);
};

export default RestaurantRoutes;
