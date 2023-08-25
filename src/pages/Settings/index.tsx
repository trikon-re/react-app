import React from "react";
import RestaurantRoutes from "./routes";
import Navigator from "./Navigator";

const Settings: React.FC = () => {
	return (
		<>
			<Navigator />
			<RestaurantRoutes />
		</>
	);
};

export default Settings;
