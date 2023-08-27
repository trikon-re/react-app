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

// const Employees: React.FC = () => {
//   const { getQueryParams } = usePaginate();
//   const { data } = useGetEmployees(getQueryParams());
//   const [employees, setEmployees] = React.useState<any>([]);
//   React.useEffect(() => {
//     if (!data) return;
//     setEmployees(data?.data?.data);
//   }, [data]);
//   console.log(employees);

//   const [current, setCurrent] = useState("employees");

//   const onClick: MenuProps["onClick"] = (e) => {
//     console.log("click ", e);
//     setCurrent(e.key);
//   };

//   return (
//     <>
//       <div className="md:flex flex-row hidden">
//         <div className="text-2xl font-bold p-3">Employees</div>
//         <IconButton>
//           <Icon icon="ic:baseline-plus" />
//         </IconButton>
//       </div>
//       <div className="flex md:flex-row flex-col md:items-end justify-between my-5 border-b">
//         <Menu
//           onClick={onClick}
//           selectedKeys={[current]}
//           mode="horizontal"
//           items={items}
//           className="max-w-sm"
//         />
//         <RangePicker
//           bordered={false}
//           size={"large"}
//           allowClear
//           allowEmpty={[false, false]}
//         />
//       </div>

//       <div className="flex md:flex-row flex-col-reverse md:items-center md:justify-between">
//         <div className="flex flex-row items-center md:ml-4 mt-1">
//           <Icon
//             className="text-lg text-slate-600 m-1.5 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
//             icon="lucide:arrow-down-up"
//           />
//           <h1 className="text-md font-bold text-slate-600 underline underline-offset-4 hidden md:inline">
//             Sort by: {"  "}
//           </h1>

//           <Select
//             bordered={false}
//             className="w-40 text-text-dark font-semibold mt-0.5 mr-3"
//             size="large"
//             showSearch
//             placeholder="Search to Select"
//             optionFilterProp="children"
//             onChange={onChange}
//             onSearch={onSearch}
//             filterOption={(input, option) =>
//               (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
//             }
//             options={[
//               {
//                 value: "Newest",
//                 label: "Newest",
//               },
//               {
//                 value: "Last Updated",
//                 label: "Last Updated",
//               },
//             ]}
//           />
//           <div className="md:flex flex-row items-center hidden">
//             <Icon
//               className="text-lg text-slate-600 m-1.5 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text "
//               icon="cil:filter"
//             />
//             <h1 className="text-md font-bold text-slate-600">Filter</h1>
//           </div>
//         </div>
//         <Input
//           className="font-semibold text-base"
//           placeholder="Search..."
//           style={{ width: 250 }}
//           prefix={
//             <Icon
//               className="text-lg m-1.5 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
//               icon="mingcute:search-3-line"
//             />
//           }
//         />
//       </div>

//     </>
//   );
// };
export default Employees;
