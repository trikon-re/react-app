import React from "react";
import Navigator from "./Navigator";
import MediaDetailsRoutes from "./routes";

const Details: React.FC = () => {
  return (
    <>
      {" "}
      <Navigator />
      <MediaDetailsRoutes />
    </>
  );
};

export default Details;
