import React from "react";

import handleResponse from "@/utilities/handleResponse";
import { Controller, useForm } from "react-hook-form";
import { message } from "@components/antd/message";
import { Button, Divider as MuiDivider } from "@mui/material";
import { Divider, Input, Segmented, Select } from "antd";
import Label from "@components/Label";
import { Link } from "react-router-dom";
import { useCreateLead } from "@/queries/leads";
import useMedia from "@/hooks/useMedia";
import { Icon } from "@iconify/react";
import useLeadStatus from "@/hooks/useLeadStatus";
import useEmployee from "@/hooks/useEmployee";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: createLead, isLoading: leadCreating } = useCreateLead();
  const { media, isMediaLoading, searchMedia } = useMedia();
  const { leadStatus, isLeadStatusLoading, searchLeadStatus } = useLeadStatus();
  const { employee, isEmployeeLoading, searchEmployee } = useEmployee();

  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });

  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating Lead..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createLead({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Lead created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };
  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto my-2 px-5 py-4 text-text">
          <h1 className="font-bold text-3xl">Create New Lead</h1>
          <Link to={"/app/leads"} className="font-bold text-sm underline">
            View All Leads
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
                defaultValue={"Non Binary"}
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

              <Label
                isRequired
                className="flex flex-row items-center gap-1 mt-2 my-1"
              >
                Company
              </Label>
              <Controller
                control={control}
                name={"company"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
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
                Designation
              </Label>
              <Controller
                control={control}
                name={"designation"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
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
          <MuiDivider flexItem orientation="vertical" className="mt-7" />

          <div className="w-full">
            <div className="w-full">
              <Divider orientation="left">Additional Details</Divider>
              <div className="px-3">
                <div className="flex flex-row">
                  <span className="w-2/3">
                    <Label isRequired>Media</Label>
                  </span>
                  <span>
                    <Label isRequired>Commision</Label>
                  </span>
                </div>
                <Input.Group compact>
                  <Controller
                    control={control}
                    name={"media_id"}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Select
                        size="large"
                        placeholder="Search media..."
                        allowClear={false}
                        value={value || undefined}
                        showSearch
                        options={media}
                        onSearch={searchMedia}
                        loading={isMediaLoading}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-2/3 border-r-0"
                        status={error ? "error" : ""}
                        suffixIcon={
                          <Icon
                            className="text-xl text-text"
                            icon={"mingcute:search-3-line"}
                          />
                        }
                        //   disabled={isLoading}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={"media_commision"}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        className="w-1/3"
                        placeholder={"Commision"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        suffix={
                          <Icon
                            icon={"mdi:percent-box"}
                            className="text-text-light text-lg"
                          />
                        }
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    )}
                  />
                </Input.Group>
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex-1">
                    <Label isRequired>Status</Label>
                    <Controller
                      control={control}
                      name={"status_id"}
                      rules={{ required: true }}
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
                          suffixIcon={
                            <Icon
                              className="text-xl text-text"
                              icon={"mingcute:search-3-line"}
                            />
                          }
                          //   disabled={isLoading}
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <Label isRequired>Priority</Label>
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
                <Label isRequired>Assigned To</Label>
                <Controller
                  control={control}
                  name={"assigned_to"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      size="large"
                      placeholder="Search Employee..."
                      allowClear={false}
                      value={value || undefined}
                      showSearch
                      options={employee}
                      onSearch={searchEmployee}
                      loading={isEmployeeLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                      className="w-full"
                      status={error ? "error" : ""}
                      suffixIcon={
                        <Icon
                          className="text-xl text-text-dark"
                          icon={"clarity:employee-solid"}
                        />
                      }
                      //   disabled={isLoading}
                    />
                  )}
                />
              </div>

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
                <Label className="flex flex-row items-center gap-1 mt-2 my-1">
                  Address Line 2
                </Label>
                <Controller
                  control={control}
                  name={"address_line2"}
                  rules={{ required: false }}
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
                  disabled={leadCreating}
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
