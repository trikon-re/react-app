import { useGetEmployees } from "@/queries/employees";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import React from "react";
import {
	Avatar,
	IconButton,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { IEmployees } from "@pages/Employees/types";
import EmployeeCard from "./components/EmployeeCard";

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

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
