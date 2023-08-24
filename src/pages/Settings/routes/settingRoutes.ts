import { lazy } from "react";
import { RESTAURANT_ROUTES } from "./paths";

export const resRoutes = [
  {
    path: RESTAURANT_ROUTES.PERSONAL,
    Component: lazy(() => import("../pages/Personal")),
  },
  {
    path: RESTAURANT_ROUTES.SECURITY,
    Component: lazy(() => import("../pages/Security")),
  },
  {
    path: RESTAURANT_ROUTES.SESSION,
    Component: lazy(() => import("../pages/Session")),
  },
  {
    path: RESTAURANT_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
