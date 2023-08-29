import { useGetMediaById, useUpdateMediaById } from "@/queries/media";
import handleResponse from "@/utilities/handleResponse";
import { Input, Segmented, Tag, DatePicker } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Avatar, Button, IconButton } from "@mui/material";
import Label from "@components/Label";
import Iconify from "@components/iconify";

import dayjs from "dayjs";

import { message } from "@components/antd/message";
import { stringAvatar } from "@/utilities/stringAvatar";
import { Icon } from "@iconify/react";

const Overview: React.FC = () => {
	const params = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const {
		reset,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm({});
	const { data } = useGetMediaById(params.id);
	const [mediaInfo, setMediaInfo] = React.useState<any>([]);
	const { mutateAsync: updateMedia, isLoading: isSubmitting } =
		useUpdateMediaById();

	React.useEffect(() => {
		if (!data) return;
		setMediaInfo(data?.data?.data);
	}, [data]);

	React.useEffect(() => {
		if (!mediaInfo || isDirty) return;
		reset({
			first_name: mediaInfo?.firstName,
			last_name: mediaInfo?.lastName,
			phone: mediaInfo?.phone,
			email: mediaInfo?.email,
			gender: mediaInfo?.gender,
			dob: mediaInfo?.dob,
			address_line1: mediaInfo?.address_line1,
			address_line2: mediaInfo?.address_line2,
			display_picture: mediaInfo?.display_picture,
			role_id: mediaInfo?.role?._id,
		});
	}, [mediaInfo]);

	const onValid = async (d: FieldValues) => {
		messageApi.open({
			type: "loading",
			content: `Updating information...`,
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				updateMedia({
					id: params?.id,
					data: d,
				}),
			[200]
		);
		messageApi.destroy();
		if (res.status) messageApi.success("Information updated successfully!");
		else messageApi.error(res.message);
	};
	return (
		<>
			{contextHolder}
			<form onSubmit={handleSubmit(onValid)}>
				<>
					<div className="max-w-md p-3 mx-auto">
						<div className="flex flex-row items-center">
							<Avatar
								variant="rounded"
								src={mediaInfo?.display_picture}
								{...stringAvatar(
									`${mediaInfo?.first_name} ${mediaInfo?.last_name}`
								)}
								className="w-[100px] h-[100px] rounded-xl  m-2"
							/>

							<div className="flex flex-col gap-2 items-start">
								<p className="text-2xl font-bold text-text-light">
									{`${mediaInfo?.first_name} ${mediaInfo?.last_name}`}
									<IconButton className="float-right w-10">
										<Icon
											className="text-text-dark "
											icon="material-symbols:edit-outline"
										/>
									</IconButton>
								</p>
								<p className="text-sm font-semibold -mt-4 text-text-light">
									Level 1 Media
								</p>

								<Tag
									color={mediaInfo?.verified_at ? "#087890" : "grey"}
									className="flex flex-row gap-1 items-center w-fit"
								>
									{mediaInfo?.verified_at ? "Verified" : "Not Verified"}
									<Icon icon="ic:round-verified" />
								</Tag>
							</div>
						</div>
						{/* Address */}
						<div className="">
							<Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
								Address Line 1
							</Label>
							<Controller
								control={control}
								name={"address_line1"}
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
							<Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
								Address Line 2
							</Label>
							<Controller
								control={control}
								name={"address_line2"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input
										className="font-medium text-sm my-1"
										placeholder={"Address line 2"}
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

						{/* Phone */}
						<Label className="flex flex-row items-center gap-1 mt-2 my-1text-text font-semibold">
							Phone
						</Label>
						<Controller
							control={control}
							name={"phone"}
							// rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									className="font-medium text-sm my-1"
									placeholder={"Phone"}
									prefix={
										<Iconify
											icon={"ic:outline-phone"}
											className="text-text-light text-lg"
										/>
									}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>

						{/* Email */}
						<Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
							Email
						</Label>
						<Controller
							control={control}
							name={"email"}
							// rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									className=" font-medium text-sm my-1"
									prefix={
										<Iconify
											icon={"mdi-light:email"}
											className="text-text-light text-lg"
										/>
									}
									placeholder={"example@gmail.com"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>

						{/* <div className="flex flex-row gap-2"> */}
						<Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
							Gender
						</Label>
						<Controller
							control={control}
							name={"gender"}
							// rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Segmented
									block
									placeholder={"Gender"}
									size={"large"}
									className="relative w-full  "
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
						<Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
							Date of Birth
						</Label>
						<Controller
							control={control}
							name={"dob"}
							// rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<DatePicker
									size="large"
									placeholder="Date of Birth"
									className="text-text-light w-full"
									onChange={onChange}
									onBlur={onBlur}
									value={dayjs(value)}
								/>
							)}
						/>

						<Button
							variant="contained"
							fullWidth
							size="large"
							type={"submit"}
							className="mt-5 bg-slate-600"
							disabled={isSubmitting}
						>
							Update
						</Button>
					</div>
				</>
			</form>
		</>
	);
};

export default Overview;
