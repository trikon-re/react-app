import { lazy } from "react";
import { PRIVATE_ROUTES } from "./paths";

export const privateRoutes = [
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    Component: lazy(() => import("@pages/Dashboard")),
  },
  {
    path: PRIVATE_ROUTES.CREATE,
    Component: lazy(() => import("@pages/Create")),
  },
  {
    path: PRIVATE_ROUTES.EMPLOYEES,
    Component: lazy(() => import("@pages/Employees")),
  },
  {
    path: PRIVATE_ROUTES.ROLES,
    Component: lazy(() => import("@pages/Roles")),
  },
  {
    path: PRIVATE_ROUTES.INFO,
    Component: lazy(() => import("@pages/Info")),
  },
  {
    path: PRIVATE_ROUTES.MEDIA,
    Component: lazy(() => import("@pages/Media")),
  },
  {
    path: PRIVATE_ROUTES.SETTINGS,
    Component: lazy(() => import("@pages/Settings")),
  },
  {
    path: PRIVATE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
