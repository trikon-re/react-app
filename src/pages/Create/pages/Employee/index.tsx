import React from "react";

import handleResponse from "@/utilities/handleResponse";
import { Controller, useForm } from "react-hook-form";
import { message } from "@components/antd/message";
import { useCreateEmployee } from "@/queries/employees";
import { Button, Divider as MuiDivider } from "@mui/material";
import { DatePicker, Divider, Input, Segmented, Select } from "antd";
import dayjs from "dayjs";
import Label from "@components/Label";
import { Link } from "react-router-dom";
import Iconify from "@components/iconify";
import useRole from "@/hooks/useRole";

const Create: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const { mutateAsync: createEmployee, isLoading: employeeCreating } =
		useCreateEmployee();
	const { role, isRoleLoading, searchRole } = useRole();
	const { handleSubmit, control, reset } = useForm({
		// resolver: joiResolver(loginResolver),
	});

	const onSubmit = async (data: any) => {
		messageApi.open({
			type: "loading",
			content: "Creating Employee..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				createEmployee({
					...data,
				}),
			[201]
		);
		messageApi.destroy();
		if (res.status) {
			reset();
			messageApi.success("Employee created successfully!");
		} else {
			messageApi.error(res.message);
		}
	};
	return (
		<>
			{contextHolder}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto my-2 px-5 py-4 text-text">
					<h1 className="font-bold md:text-3xl text-2xl">
						Create New Employee
					</h1>
					<Link
						to={"/app/employees"}
						className="font-bold text-sm underline"
					>
						View All Employees
					</Link>
				</div>
				<div className="flex md:flex-row flex-col container mx-auto max-w-5xl">
					<div className="w-full">
						<Divider orientation="left">Basic Info</Divider>
						<div className="px-3">
							<Label isRequired>Full Name</Label>
							<Input.Group compact>
								<Controller
									control={control}
									name={"first_name"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											className="w-1/2"
											placeholder={"Enter First Name"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									)}
								/>
								<Controller
									control={control}
									name={"last_name"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											className="w-1/2"
											placeholder={"Enter Last Name"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									)}
								/>
							</Input.Group>
							{/* <Label className="mt-2 mb-1">Username</Label>
              <Controller
                control={control}
                name={"username"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // disabled
                    placeholder={"Username"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              /> */}

							<Label className="mt-2 mb-1 ">Email</Label>
							<Controller
								control={control}
								name={"email"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input
										placeholder={"Enter Email Address"}
										size={"large"}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										//   suffix={<ErrorSuffix error={error} />}
									/>
								)}
							/>

							<Label className="mt-2 mb-1">Phone</Label>
							<Controller
								control={control}
								name={"phone"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input
										// disabled
										placeholder={"Enter Phone Number"}
										size={"large"}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										//   suffix={<ErrorSuffix error={error} />}
									/>
								)}
							/>

							<Label className="mt-2 mb-1">Gender</Label>
							<Controller
								control={control}
								name={"gender"}
								defaultValue={"Non Binary"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Segmented
										block
										placeholder={"Gender"}
										size={"large"}
										className="relative w-full"
										allowFullScreen
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										options={[
											{ value: "Male", label: "Male" },
											{ value: "Female", label: "Female" },
											{ value: "Non Binary", label: "Non Binary" },
										]}
										onResize={undefined}
										onResizeCapture={undefined}
										// status={error ? "error" : ""}
										// loading={isLoading}
									/>
								)}
							/>
							<Label className="mt-2 mb-1">Date of Birth</Label>
							<Controller
								control={control}
								name={"dob"}
								defaultValue={dayjs()}
								// rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<DatePicker
										size="large"
										className={"w-full"}
										placeholder="Date of Birth"
										onChange={onChange}
										onBlur={onBlur}
										value={dayjs(value)}
									/>
								)}
							/>
							{/* <Label className="mt-2 mb-1">Curriculum Vitae</Label>
              <Controller
                control={control}
                name={"cv"}
                // rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    size="large"
                    className={"w-full"}
                    prefix={<Iconify icon={"ph:link"} />}
                    placeholder="Attachment"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              /> */}

							<Divider orientation="left">Address Details</Divider>

							<Label
								isRequired
								className="flex flex-row items-center gap-1 mt-2 my-1"
							>
								Address
							</Label>
							<Controller
								control={control}
								name={"address"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input.TextArea
										placeholder={"Enter Address..."}
										size={"large"}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										//   suffix={<ErrorSuffix error={error} />}
									/>
								)}
							/>
						</div>
					</div>
					<MuiDivider
						flexItem
						orientation="vertical"
						className="mt-7"
					/>
					<div className="w-full">
						<Divider orientation="left">Access Information</Divider>
						<div className="px-3">
							<Controller
								control={control}
								name={"password"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label
											isRequired
											className="flex flex-row items-center gap-1"
										>
											New Password
											{/* {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title={"Password should be atleast 6 characters long."}
                       placement="topLeft"
                    >
                       <Icon color={"action"} className="text-base mb-1">
                        <AiFillInfoCircle />
                      </Icon> 
                    </Tooltip>
                  )}  */}
										</Label>
										<Input.Password
											placeholder="Enter Password"
											size="large"
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
										/>
									</>
								)}
							/>
							<Controller
								control={control}
								name={"role_id"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label
											//   isRequired
											className="flex flex-row items-center gap-1 mt-2 my-1 "
										>
											Role
											{/* {error ? (
                  <ErrorSuffix error={error} />
                ) : (
                  <Tooltip
                    title={"Password should be atleast 6 characters long."}
                     placement="topLeft"
                  >
                     <Icon color={"action"} className="text-base mb-1">
                      <AiFillInfoCircle />
                    </Icon> 
                  </Tooltip>
                )}  */}
										</Label>
										<Select
											value={value}
											size="large"
											showSearch
											className="w-full"
											placeholder={"Select a Role..."}
											suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
											onChange={onChange}
											options={role}
											onSearch={searchRole}
											loading={isRoleLoading}
											status={error ? "error" : ""}
										/>
									</>
								)}
							/>
							<Label className="mt-2 mb-1">Maximum Device</Label>
							<Controller
								control={control}
								name={"max_session"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input
										placeholder={"2"}
										size={"large"}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										//   suffix={<ErrorSuffix error={error} />}
									/>
								)}
							/>
						</div>
						<div className="w-full">
							<Divider orientation="left">Payroll Information</Divider>
							<div className="px-3">
								<Label
									// isRequired
									className="mt-2 mb-1"
								>
									Work Hours
								</Label>
								<Controller
									control={control}
									name={"work_hour"}
									//   rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											prefix={<Iconify icon={"iconamoon:clock-duotone"} />}
											placeholder={"8"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									)}
								/>{" "}
								<Label className="mt-2 mb-1">Bank</Label>
								<Controller
									control={control}
									name={"bank"}
									//   rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											placeholder={"Enter Bank"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									)}
								/>
								<Label
									isRequired
									className="mt-2 mb-1"
								>
									Salary
								</Label>
								<Controller
									control={control}
									name={"salary"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											placeholder={"Enter Salary"}
											addonAfter={<Iconify icon={"tabler:currency-taka"} />}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									)}
								/>
								<Button
									variant="contained"
									fullWidth
									size="large"
									type={"submit"}
									className="mt-5 bg-slate-600"
									disabled={employeeCreating}
								>
									Submit
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default Create;
