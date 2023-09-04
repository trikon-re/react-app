import { lazy } from "react";
import { MEDIA_ROUTES } from "./path";

export const mediaRoutes = [
  {
    path: MEDIA_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: MEDIA_ROUTES.TRASH,
    Component: lazy(() => import("../pages/Trash")),
  },
  {
    path: MEDIA_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
