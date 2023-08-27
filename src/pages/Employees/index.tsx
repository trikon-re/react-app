import React from "react";
import Navigator from "./Navigator";
import EmployeeRoutes from "./routes";

const Employees: React.FC = () => {

	return (
		<>
			<Navigator />
			<EmployeeRoutes />
		</>
	);
};

export default Employees;
