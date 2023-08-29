import Label from "@components/Label";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Input, Segmented, Tag, DatePicker } from "antd";
import {
  Avatar,
  Button,
  IconButton,
  Divider as MuiDivider,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import {
  useGetEmployeesById,
  useUpdateEmployeesById,
} from "@/queries/employees";
import { stringAvatar } from "@/utilities/stringAvatar";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import * as dayjs from "dayjs";
import { Button as AntButton } from "antd";

const Overview: React.FC = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({});
  const { data } = useGetEmployeesById(params.id);
  const [employeeInfo, setEmployeeInfo] = React.useState<any>([]);
  const { mutateAsync: updateEmployee, isLoading: isSubmitting } =
    useUpdateEmployeesById();

  React.useEffect(() => {
    if (!data) return;
    setEmployeeInfo(data?.data?.data);
  }, [data]);

  React.useEffect(() => {
    if (!employeeInfo || isDirty) return;
    reset({
      first_name: employeeInfo?.firstName,
      last_name: employeeInfo?.lastName,
      phone: employeeInfo?.phone,
      email: employeeInfo?.email,
      gender: employeeInfo?.gender,
      dob: employeeInfo?.dob,
      hired_date: employeeInfo?.hired_date,
      max_session: employeeInfo?.max_session,
      work_hour: employeeInfo?.work_hour,
      salary: employeeInfo?.salary,
      bank: employeeInfo?.bank,
      address: employeeInfo?.address,
      display_picture: employeeInfo?.display_picture,
      role_id: employeeInfo?.role?._id,
    });
  }, [employeeInfo]);

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateEmployee({
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
            <div className="flex flex-row items-center gap-2">
              <Avatar
                variant="rounded"
                src={employeeInfo?.display_picture}
                {...stringAvatar(
                  `${employeeInfo?.first_name} ${employeeInfo?.last_name}`
                )}
                className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-xl  m-2"
              />

              <div className="flex flex-col gap-2 items-start">
                <p className="text-2xl font-bold text-text-light">
                  {`${employeeInfo?.first_name} ${employeeInfo?.last_name}`}
                  <IconButton className="float-right w-10">
                    <Icon
                      className="text-text-dark "
                      icon="material-symbols:edit-outline"
                    />
                  </IconButton>
                </p>
                <p className="text-sm font-medium text-text-light -mt-3">
                  {employeeInfo?.role?.name || "No role assigned"}
                  <br />
                  <span>@{employeeInfo?.username}</span>
                </p>

                <Tag
                  color={employeeInfo?.verified_at ? "#087890" : "grey"}
                  className="flex flex-row gap-1 items-center w-fit"
                >
                  {employeeInfo?.verified_at ? "Verified" : "Not Verified"}
                  <Icon icon="ic:round-verified" />
                </Tag>
              </div>
            </div>
            {/* Address */}
            <div className="">
              <Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
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
            <Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
              Curriculum Vitae
            </Label>

            <AntButton
              icon={<Icon icon="basil:upload-outline" />}
              className="flex flex-row items-center gap-1"
            >
              Click to Upload
            </AntButton>

            {/* </div> */}
          </div>
          <MuiDivider flexItem orientation="vertical" />

          <div className="m-5 w-full">
            <h1 className="text-xl font-bold text-text-light">
              Payroll Information
            </h1>
            <div className="pt-3 text-text-light">
              <Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text font-semibold">
                Work Hours
              </Label>
              <Controller
                control={control}
                name={"work_hour"}
                // rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    className=" font-medium text-sm my-1"
                    prefix={
                      <Iconify
                        icon={"iconamoon:clock-duotone"}
                        className="text-text-light text-lg"
                      />
                    }
                    placeholder={"8"}
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
                Bank
              </Label>
              <Controller
                control={control}
                name={"bank"}
                // rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    className=" font-medium text-sm my-1"
                    prefix={
                      <Iconify
                        icon={"mingcute:bank-card-line"}
                        className="text-text-light text-lg"
                      />
                    }
                    placeholder={"Bank Details"}
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
                Salary
              </Label>
              <Controller
                control={control}
                name={"salary"}
                // rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    className=" font-medium text-sm my-1"
                    prefix={
                      <Iconify
                        icon={"tabler:currency-taka"}
                        className="text-text-light text-lg"
                      />
                    }
                    placeholder={"8"}
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
