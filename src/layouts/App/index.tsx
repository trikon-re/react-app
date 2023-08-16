import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

const AppDrawer = lazy(() => import("./Drawer"));

const AppLayout: React.FC = () => {
  return (
    <>
      <div className="bg-background">
        <AppDrawer />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
