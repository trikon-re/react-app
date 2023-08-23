import AuthContext from "@/contexts/AuthContext";
import React from "react";

const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
