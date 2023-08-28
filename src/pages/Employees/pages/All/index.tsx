import { useGetEmployees } from "@/queries/employees";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IEmployees } from "@pages/Employees/types";
import EmployeeCard from "./components/EmployeeCard";

const Employees: React.FC = () => {
	const { getQueryParams } = usePaginate();
	const { data } = useGetEmployees(getQueryParams());
	const [employees, setEmployees] = React.useState<any>([]);

	React.useEffect(() => {
		if (!data) return;
		setEmployees(data?.data?.data);
	}, [data]);

	return (
		<>
			<div className="py-2">
				{employees?.map?.((s: IEmployees) => (
					<EmployeeCard
						employee={s}
						key={s.id}
					/>
				))}
			</div>
		</>
	);
};
export default Employees;
