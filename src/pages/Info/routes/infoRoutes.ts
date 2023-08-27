import { lazy } from "react";
import { ROUTES } from "./paths";

export const routes = [
  {
    path: ROUTES.EMPLOYEE,
    Component: lazy(() => import("../pages/Employee")),
  },
  {
    path: ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];