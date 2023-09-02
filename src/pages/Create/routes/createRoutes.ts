import { lazy } from "react";
import { ROUTES } from "./paths";

export const routes = [
  {
    path: ROUTES.EMPLOYEE,
    Component: lazy(() => import("../pages/Employee")),
  },
  {
    path: ROUTES.ROLE,
    Component: lazy(() => import("../pages/Role")),
  },
  {
    path: ROUTES.MEDIA,
    Component: lazy(() => import("../pages/Media")),
  },
  {
    path: ROUTES.PROPERTY,
    Component: lazy(() => import("../pages/Property")),
  },
  {
    path: ROUTES.LEAD,
    Component: lazy(() => import("../pages/Lead")),
  },
  {
    path: ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
