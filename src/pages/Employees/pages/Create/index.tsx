import React from "react";

import handleResponse from "@/utilities/handleResponse";
import { Controller, useForm } from "react-hook-form";
import { message } from "@components/antd/message";
import { useCreateEmployee } from "@/queries/employees";
import { Button, Typography } from "@mui/material";
import { DatePicker, Divider, Input, Segmented, Tooltip } from "antd";
import { Icon } from "@iconify/react";

import * as dayjs from "dayjs";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createEmployee, isLoading: employeeCreating } =
    useCreateEmployee();

  const { handleSubmit, control } = useForm({
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
      messageApi.success("Employee created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };
  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider />
        <div className="flex flex-row container mx-auto">
          <div className="max-w-sm  ">
            <Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
              Full Name
            </Typography>
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
                    placeholder={"First Name"}
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
                    placeholder={"Last Name"}
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

            <Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
              Phone
            </Typography>
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
                  placeholder={"Phone"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  //   suffix={<ErrorSuffix error={error} />}
                />
              )}
            />

            <Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
              Email
              <Tooltip
                title={"Please enter a valid email address"}
                placement="rightTop"
              >
                <Icon icon="ph:info-fill" />
              </Tooltip>
            </Typography>
            <Controller
              control={control}
              name={"email"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Email"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  //   suffix={<ErrorSuffix error={error} />}
                />
              )}
            />

            <Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
              Gender
            </Typography>
            <Controller
              control={control}
              name={"gender"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Segmented
                  placeholder={"Gender"}
                  size={"large"}
                  className="relative"
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

            <div className="flex flex-row gap-2">
              <div>
                <Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
                  Date of Birth
                </Typography>
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
                      onChange={onChange}
                      onBlur={onBlur}
                      value={dayjs(value)}
                    />
                  )}
                />
              </div>
              <div>
                <Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
                  Bank
                </Typography>
                <Controller
                  control={control}
                  name={"bank"}
                  // rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      placeholder={"Bank"}
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

            <Typography className="flex flex-row items-center gap-1 mt-2 my-1">
              Address
            </Typography>
            <Controller
              control={control}
              name={"address"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Address"}
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
          <Divider type="vertical" className="h-full" />
          <div className="container max-w-sm  ">
            <Button
              variant="contained"
              fullWidth
              size="large"
              type={"submit"}
              className="mt-5 bg-slate-600"
              disabled={employeeCreating}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
