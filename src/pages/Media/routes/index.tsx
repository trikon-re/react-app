import React, { Suspense } from "react";
import NProgressSuspense from "@components/NProgressSuspense";
import { Route, Routes } from "react-router-dom";
import { mediaRoutes } from "./mediaRoutes";

const MediaRoutes: React.FC = () => {
  return (
    <Routes>
      {mediaRoutes?.map?.(({ path, Component }) => (
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

export default MediaRoutes;
