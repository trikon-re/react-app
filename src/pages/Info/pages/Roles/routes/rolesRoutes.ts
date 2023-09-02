import { lazy } from "react";
import { ROUTES } from "./paths";

export const routes = [
	{
		path: ROUTES.OVERVIEW,
		Component: lazy(() => import("../pages/Overview")),
	},
	{
		path: ROUTES.PERMISSIONS,
		Component: lazy(() => import("../pages/Permissions")),
	},
	{
		path: ROUTES.NOTFOUND,
		Component: lazy(() => import("@pages/NotFound")),
	},
];
