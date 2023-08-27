import React from "react";
import Navigator from "./Navigator";
import RoleRoutes from "./routes";

const Roles: React.FC = () => {
  return (
    <>
      <Navigator />
      {/* Hi from roles */}
      <RoleRoutes />
    </>
  );
};

export default Roles;
