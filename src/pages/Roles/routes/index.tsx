import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { roleRoutes } from "./roleRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const RoleRoutes: React.FC = () => {
  return (
    <Routes>
      {roleRoutes?.map?.(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<NProgressSuspense />}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default RoleRoutes;
