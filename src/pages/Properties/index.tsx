import React from "react";
import Navigator from "./Navigator";
import PropertyRoutes from "./routes";

const Roles: React.FC = () => {
  return (
    <>
      <Navigator />
      {/* Hi from roles */}
      <PropertyRoutes />
    </>
  );
};

export default Roles;
