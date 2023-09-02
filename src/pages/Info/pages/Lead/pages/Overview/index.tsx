import Label from "@components/Label";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Input, Segmented, DatePicker, Select } from "antd";
import { Avatar, Button, Divider as MuiDivider } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";

import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";

import dayjs from "dayjs";

import { useGetLeadsById, useUpdateLeadsById } from "@/queries/leads";
import { stringAvatar } from "@/utilities/stringAvatar";
import { useGetMediaById } from "@/queries/media";
import useLeadStatus from "@/hooks/useLeadStatus";

const Overview: React.FC = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({});
  const { data } = useGetLeadsById(params.id);
  const [leadInfo, setLeadInfo] = React.useState<any>([]);
  const { data: mediaData } = useGetMediaById(leadInfo?.media_id);
  const { mutateAsync: updateLead, isLoading: isSubmitting } =
    useUpdateLeadsById();
  const { leadStatus, isLeadStatusLoading, searchLeadStatus } = useLeadStatus();

  React.useEffect(() => {
    if (!data) return;
    setLeadInfo(data?.data?.data);
  }, [data]);

  React.useEffect(() => {
    if (!leadInfo || isDirty) return;
    reset({
      first_name: leadInfo?.firstName,
      last_name: leadInfo?.lastName,
      phone: leadInfo?.phone,
      email: leadInfo?.email,
      gender: leadInfo?.gender,
      company: leadInfo?.company,
      designation: leadInfo?.designation,
      created_at: leadInfo?.dob,
      status_id: leadInfo?.status_id,
      priority: leadInfo?.priority,
      address_line1: leadInfo?.address_line1,
      display_picture: leadInfo?.assignee?.display_picture,
    });
  }, [leadInfo]);

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateLead({
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
        <div className="flex md:flex-row flex-col container mx-auto max-w-5xl">
          <div className="w-full p-3">
            <div className="flex flex-col gap-1 items-start">
              <p className="text-2xl font-bold text-text-light">
                {`${leadInfo?.first_name} ${leadInfo?.last_name}`}
              </p>
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-1">
                  <Icon
                    icon="ic:twotone-person-pin"
                    className="text-md text-text-light"
                  />
                  <p className="text-xs font-bold text-text-light">
                    {leadInfo?.designation}
                  </p>
                </div>
                <div className="flex flex-row gap-1">
                  <Icon
                    icon="fluent:building-20-filled"
                    className="text-md text-text-light"
                  />
                  <p className="text-xs font-bold text-text-light">
                    {leadInfo?.company}
                  </p>
                </div>
                <div className="flex flex-row gap-1">
                  <Icon
                    icon="octicon:location-24"
                    className="text-md text-text-light"
                  />
                  <p className="text-xs font-bold text-text-light">
                    {leadInfo?.address_line1}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="">
              <Label className="flex flex-row items-center gap-1 mt-4 my-1 text-text font-semibold">
                Address
              </Label>
              <Controller
                control={control}
                name={"address_line1"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input.TextArea
                    className="text-text-light font-semibold text-sm min-h-[100px]"
                    placeholder="Address..."
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
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

            {/* </div> */}
          </div>
          <MuiDivider flexItem orientation="vertical" />

          <div className="m-5 w-full">
            <h1 className="text-xl font-bold text-text-light">
              Additional Information
            </h1>
            <div className="pt-3 text-text-light">
              <div className="flex flex-row gap-2">
                <div className="flex-1">
                  <Label>Status</Label>
                  <Controller
                    control={control}
                    name={"status_id"}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Select
                        size="large"
                        placeholder="Search Status..."
                        allowClear={false}
                        value={value || undefined}
                        showSearch
                        options={leadStatus}
                        onSearch={searchLeadStatus}
                        loading={isLeadStatusLoading}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-full"
                        status={error ? "error" : ""}

                        //   disabled={isLoading}
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Label>Priority</Label>
                  <Controller
                    control={control}
                    name={"priority"}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Select
                        size="large"
                        placeholder="Priority..."
                        allowClear={false}
                        value={value || undefined}
                        options={[
                          { value: "HIGHEST", label: "Highest" },
                          { value: "HIGH", label: "High" },
                          { value: "MEDIUM", label: "Medium" },
                          { value: "LOW", label: "Low" },
                          { value: "LOWEST ", label: "Lowest" },
                        ]}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-full"
                        status={error ? "error" : ""}
                        //   disabled={isLoading}
                      />
                    )}
                  />
                </div>
              </div>

              <Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
                Entry Date
              </Label>
              <Controller
                control={control}
                name={"created_at"}
                // rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    disabled
                    size="large"
                    placeholder="Date of Birth"
                    className="text-text-light w-full"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={dayjs(value)}
                  />
                )}
              />
              <Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
                Assignee &bull;{" "}
                <Link to="#" className="text-xs ml-1 underline">
                  Change Assignee
                </Link>
              </Label>
              <div className=" flex flex-row gap-2 items-center border border-[#d9d9d9] rounded my-2 p-2">
                <Avatar
                  variant="rounded"
                  src={leadInfo?.display_picture}
                  {...stringAvatar(
                    `${leadInfo?.first_name} ${leadInfo?.last_name}`
                  )}
                  className="text-xs w-[25px] h-[25px] border"
                />
                <p className="text-sm font-bold text-text">
                  {leadInfo?.assignee?.first_name}{" "}
                  {leadInfo?.assignee?.last_name}
                </p>
              </div>

              <h1 className="text-xl font-bold text-text-light my-5">
                Medial Information
              </h1>

              <div className="flex flex-row items-center">
                <Link to={`/app/info/media/${mediaData?.data?.data?.id}`}>
                  <Avatar
                    variant="rounded"
                    src={leadInfo?.media?.display_picture}
                    {...stringAvatar(
                      `${leadInfo?.media?.first_name} ${leadInfo?.media?.last_name}`
                    )}
                    className="md:w-[75px] md:h-[75px] w-[60px] h-[60px] rounded-2xl mt-1"
                  />
                </Link>
                <span className="flex flex-col px-2">
                  <Link to={`/app/info/media/${leadInfo?.media?.id}`}>
                    <p className="text-lg font-bold text-text-light">{`${leadInfo?.media?.first_name} ${mediaData?.data?.data?.last_name}`}</p>
                  </Link>
                  <p className="text-sm font-medium text-text-light">
                    {leadInfo?.media?.gender}
                  </p>
                  <p className="text-sm font-medium text-text-light">
                    <b>ID No:</b> {leadInfo?.media?.id}
                    {leadInfo?.media?.first_name?.[0]}
                  </p>
                </span>
              </div>
              <div className="my-4">
                <Label className="mt-2 text-text-light font-semibold">
                  Commision
                </Label>
                {/* <Controller
              control={control}
              name={"media_commision"}
              // rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => ( */}
                <Input
                  disabled
                  className="font-medium text-sm my-1"
                  prefix={
                    <Iconify
                      icon={"mdi:percent-box"}
                      className="text-text-light text-lg"
                    />
                  }
                  placeholder={"Enter percent rate"}
                  size={"large"}
                  // onChange={onChange}
                  // onBlur={onBlur}
                  value={leadInfo?.media_commision} /*needs to change*/
                  // status={error ? "error" : ""}
                  suffix={"%"}
                />
                {/* )}
            /> */}
              </div>

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
          </div>
        </div>
      </form>
    </>
  );
};

export default Overview;
