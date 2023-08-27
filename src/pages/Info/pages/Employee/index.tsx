import React from "react";
import EmployeeDetailsRoutes from "./routes";
import Navigator from "./Navigator";

const Details: React.FC = () => {
  return (
    <>
      <Navigator />
      <EmployeeDetailsRoutes />
    </>
  );
};

export default Details;
