import { lazy } from "react";
import { ROUTES } from "./paths";

export const routes = [
  {
    path: ROUTES.OVERVIEW,
    Component: lazy(() => import("../pages/Overview")),
  },
  {
    path: ROUTES.PERFORMANCE,
    Component: lazy(() => import("../pages/Performance")),
  },
  {
    path: ROUTES.ATTENDANCE,
    Component: lazy(() => import("../pages/Attendance")),
  },
  {
    path: ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
