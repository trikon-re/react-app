import React from "react";

import handleResponse from "@/utilities/handleResponse";
import { Controller, useForm } from "react-hook-form";
import { message } from "@components/antd/message";
import { Button, Divider as MuiDivider } from "@mui/material";
import { DatePicker, Divider, Input, Segmented, Select } from "antd";
import * as dayjs from "dayjs";
import Label from "@components/Label";
import { Link } from "react-router-dom";
import { useCreateMedia } from "@/queries/media";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createMedia, isLoading: mediaCreating } =
    useCreateMedia();
  // const { role, isRoleLoading, searchRole } = useRole();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });

  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating Media..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createMedia({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Media created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };
  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto my-2 px-5 py-4 text-text">
          <h1 className="font-bold text-3xl">Create New Media</h1>
          <Link to={"/app/Media"} className="font-bold text-sm underline">
            View All Medias
          </Link>
        </div>
        <div className="flex flex-row container mx-auto max-w-5xl">
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

              <Label isRequired className="mt-2 mb-1">
                Phone
              </Label>
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

              <Label isRequired className="mt-2 mb-1">
                Gender
              </Label>
              <Controller
                control={control}
                name={"gender"}
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
              <Label isRequired className="mt-2 mb-1">
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
                    className={"w-full"}
                    placeholder="Date of Birth"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={dayjs(value)}
                  />
                )}
              />
            </div>
          </div>
          <MuiDivider flexItem orientation="vertical" className="mt-7" />
          <div className="w-full">
            <Divider orientation="left">Payroll Information</Divider>
            {/* <div className="px-3">
              <Label className="mt-2 mb-1">Media Commission</Label>
              <Controller
                control={control}
                name={"commission"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Enter Commission"}
                    addonAfter={<Iconify icon={"mdi:percent-box"} />}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div> */}

            <div className="w-full">
              <Divider orientation="left">Address Details</Divider>
              <div className="px-3">
                <Label
                  isRequired
                  className="flex flex-row items-center gap-1 mt-2 my-1"
                >
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
                <Label
                  isRequired
                  className="flex flex-row items-center gap-1 mt-2 my-1"
                >
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

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  type={"submit"}
                  className="mt-5 bg-slate-600"
                  disabled={mediaCreating}
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
