import { useGetRoleById } from "@/queries/roles";
import Label from "@components/Label";
import { Button, Divider } from "@mui/material";
import { Card, Input, Spin } from "antd";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const Overview: React.FC = () => {
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { data, isError, isLoading } = useGetRoleById(params.id);
	const [role, setRole] = React.useState<any>(null);

	const {
		reset,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm({});

	React.useEffect(() => {
		if (!data) return;
		setRole(data.data.data);
	}, [data]);

	React.useEffect(() => {
		if (!role || isDirty) return;
		reset({
			name: role.name,
			description: role.description,
			prefix: role.prefix,
		});
	}, [role]);

	React.useEffect(() => {
		if (isError) {
			navigate("/app/404", { replace: true });
		}
	}, [isError]);

	return (
		<Spin spinning={isLoading}>
			<div className="min-h-[30vh] flex flex-col md:flex-row items-start">
				<div className="flex-[0.7] hidden md:flex p-2">
					<Card className="w-full">
						<h1 className="font-semibold text-xl text-text">{role?.name}</h1>
						<h3 className="font-medium text-text-light mb-3">
							{role?.prefix || "No Prefix Added"}
						</h3>
						<h5 className="text-xs font-medium text-text-light">
							<Link to={"#"}>{role?.total_employees || 0} Employees</Link>{" "}
							&bull;{" "}
							<Link to={"#"}>{role?.total_permissions || 0} Permissions</Link>
						</h5>
						<p className="text-slate-400 text-xs pt-3">
							{role?.description || "No Description"}
						</p>
					</Card>
				</div>
				<Divider
					flexItem
					orientation="vertical"
					className="hidden md:block"
				/>
				<form className="w-full md:flex-1 py-2 px-4 flex-col gap-1">
					<h2 className="text-xl font-semibold my-5">Update Information</h2>
					<Label isRequired>Role Name</Label>
					<Controller
						control={control}
						name={"name"}
						rules={{ required: true }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								className="font-medium text-sm my-1"
								placeholder={"Address line 1"}
								size={"large"}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								status={error ? "error" : ""}
								//   suffix={<ErrorSuffix error={error} />}
							/>
						)}
					/>
					<Label isRequired>Role Suffix</Label>
					<Controller
						control={control}
						name={"suffix"}
						rules={{ required: true }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								className="font-medium text-sm my-1"
								placeholder={"Address line 1"}
								size={"large"}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								status={error ? "error" : ""}
								//   suffix={<ErrorSuffix error={error} />}
							/>
						)}
					/>
					<Label isRequired>Description</Label>
					<Controller
						control={control}
						name={"description"}
						rules={{ required: true }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input.TextArea
								className="font-medium text-sm my-1"
								placeholder={"Address line 1"}
								size={"large"}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								rows={5}
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
						className="mt-3 bg-slate-600"
						// disabled={isSubmitting}
					>
						Update
					</Button>
				</form>
			</div>
		</Spin>
	);
};

export default Overview;
