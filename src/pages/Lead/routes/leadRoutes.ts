import { lazy } from "react";
import { LEAD_ROUTES } from "./paths";

export const leadRoutes = [
  {
    path: LEAD_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: LEAD_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
