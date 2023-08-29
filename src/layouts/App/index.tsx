import useAuth from "@/hooks/useAuth";
import { Icon } from "@iconify/react";
import { AppBar, Avatar, Drawer, IconButton, Toolbar } from "@mui/material";
import { useToggle } from "@tam11a/react-use-hooks";
import React, { lazy } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

const AppDrawer = lazy(() => import("./Drawer"));

const AppLayout: React.FC = () => {
  const location = useLocation();

  const { state: open, toggleState: onClose, setState } = useToggle(false);

  const { isLoggedIn } = useAuth();

  React.useEffect(() => {
    setState(false);
  }, [location.pathname]);

  return isLoggedIn ? (
    <>
      <div className="lg:bg-background flex flex-col lg:flex-row lg:gap-6 lg:p-6 h-screen ">
        <aside className="bg-background-light overflow-hidden rounded-md p-4 pb-0 flex-[0.40] max-w-[400px] hidden lg:flex flex-col relative">
          <AppDrawer />
        </aside>
        <AppBar className="lg:hidden bg-primary-50">
          <Toolbar className="justify-between py-1">
            <Link to={"/app"}>
              <Avatar
                src="/assets/logo.png"
                variant="square"
                className="h-16 w-auto p-1"
              />
            </Link>
            <IconButton onClick={onClose}>
              <Icon icon={"line-md:menu"} />
            </IconButton>
            <Drawer
              open={open}
              anchor="right"
              onClose={onClose}
              PaperProps={{
                className: "w-[95vw] max-w-[400px]",
              }}
            >
              <AppDrawer />
            </Drawer>
          </Toolbar>
        </AppBar>

        <main className="flex-1 bg-background-light overflow-y-auto overflow-x-hidden lg:rounded-md mt-20 lg:mt-0 p-2 lg:p-4">
          <Outlet />
        </main>
      </div>
    </>
  ) : (
    <Navigate to={`/?to=${location.pathname}`} />
  );
};

export default AppLayout;
