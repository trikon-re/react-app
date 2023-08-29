import React from "react";
import Navigator from "./Navigator";
import PropertyDetailsRoutes from "./routes";

const Details: React.FC = () => {
  return (
    <>
      <Navigator />
      <PropertyDetailsRoutes />
    </>
  );
};

export default Details;
