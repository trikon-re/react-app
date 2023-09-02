import React from "react";
import LeadDetailsRoutes from "./routes";
import Navigator from "./Navigator";

const Details: React.FC = () => {
  return (
    <>
      <Navigator />
      <LeadDetailsRoutes />
    </>
  );
};

export default Details;
