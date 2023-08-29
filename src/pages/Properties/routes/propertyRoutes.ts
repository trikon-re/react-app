import { lazy } from "react";
import { PROPERTY_ROUTES } from "./paths";

export const propertyRoutes = [
  {
    path: PROPERTY_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: PROPERTY_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
