import useAuth from "@/hooks/useAuth";
import React, { lazy } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AppDrawer = lazy(() => import("./Drawer"));

const AppLayout: React.FC = () => {
  const location = useLocation();

  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <>
      <div className="bg-background flex flex-row gap-6 p-6 h-screen ">
        <AppDrawer />
        <main className="flex-1 bg-background-light overflow-y-auto overflow-x-hidden rounded-md p-4">
          <Outlet />
        </main>
      </div>
    </>
  ) : (
    <Navigate to={`/?to=${location.pathname}`} />
  );
};

export default AppLayout;
