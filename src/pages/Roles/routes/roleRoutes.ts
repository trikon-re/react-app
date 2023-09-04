import { lazy } from "react";
import { ROLE_ROUTES } from "./paths";

export const roleRoutes = [
  {
    path: ROLE_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: ROLE_ROUTES.TRASH,
    Component: lazy(() => import("../pages/Trash")),
  },
  {
    path: ROLE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
