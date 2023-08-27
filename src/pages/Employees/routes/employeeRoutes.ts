import { lazy } from "react";
import { EMPLOYEE_ROUTES } from "./paths";

export const empRoutes = [
	{
		path: EMPLOYEE_ROUTES.ROOT,
		Component: lazy(() => import("../pages/All")),
	},
	{
		path: EMPLOYEE_ROUTES.CREATE,
		Component: lazy(() => import("../pages/Create")),
	},
	{
		path: EMPLOYEE_ROUTES.NOTFOUND,
		Component: lazy(() => import("@pages/NotFound")),
	},
];
