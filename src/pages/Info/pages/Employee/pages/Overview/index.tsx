import Label from "@components/Label";
import { Divider, Input, Tag } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  ListItemButton,
  IconButton,
  ListItemText,
  Divider as MuiDivider,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import {
  useGetEmployeesById,
  useUpdateEmployeesById,
} from "@/queries/employees";
import { stringAvatar } from "@/utilities/stringAvatar";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";

const Overview: React.FC = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({});
  const { data, isLoading } = useGetEmployeesById(params.id);
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
      hired_date: employeeInfo?.hireDate,
      max_session: employeeInfo?.hireDate,
      work_hour: employeeInfo?.workHour,
      salary: employeeInfo?.workHour,
      bank: employeeInfo?.bank,
      address: employeeInfo?.bank,
      display_picture: employeeInfo?.bKash,
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
      [201]
    );
    messageApi.destroy();
    if (res.status) messageApi.success("Information updated successfully!");
    else messageApi.error(res.message);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row container mx-auto max-w-5xl">
          <div className="w-full p-3">
            <Avatar
              variant="rounded"
              src={employeeInfo?.display_picture}
              {...stringAvatar(
                `${employeeInfo?.first_name} ${employeeInfo?.last_name}`
              )}
              className="float-left md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-xl  m-2"
            />

            <div className="flex flex-col gap-2 items-start">
              <p className="text-2xl font-bold text-text-light">
                {`${employeeInfo?.first_name} ${employeeInfo?.last_name}`}
                <IconButton className="float-right">
                  <Icon
                    className="text-text-dark "
                    icon="material-symbols:edit-outline"
                  />
                </IconButton>
              </p>
              <p className="text-sm font-medium text-text-light -mt-3">
                Call Center Executive
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
            {/* Address */}
            <Controller
              control={control}
              name={"firstName"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  // className="w-1/2"
                  placeholder="First Name"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
            {/* Phone */}
            <Input
              readOnly
              prefix={
                <Icon icon="ph:phone" color="#999" className="mr-1 text-xl" />
              }
              className="my-2 text-md"
              placeholder={"Enter Phone Number"}
              size={"large"}
            />
            {/* Email */}
            <Input
              readOnly
              className="my-2 text-md"
              placeholder={"Enter Email"}
              size={"large"}
              prefix={
                <Icon
                  icon="mdi-light:email"
                  color="#999"
                  className="mr-1 text-xl"
                />
              }
            />
            <div className="flex flex-row gap-2">
              <Input
                readOnly
                className="my-2 text-md"
                placeholder={"DOB"}
                size={"large"}
                prefix={
                  <Icon
                    icon="solar:calendar-bold-duotone"
                    color="#999"
                    className="mr-1 text-xl"
                  />
                }
              />
              <Input
                readOnly
                className="my-2 text-md"
                placeholder={"Gender"}
                size={"large"}
                prefix={
                  <Icon
                    icon="ph:gender-intersex"
                    color="#999"
                    className="mr-1 text-xl"
                  />
                }
              />
            </div>
          </div>
          <MuiDivider flexItem orientation="vertical" />

          <div className="m-5 w-full">
            <h1 className="text-xl font-bold text-text-light">
              Payroll Information
            </h1>
            <div className="pt-3 text-text-light">
              <Label className="mt-2 mb-1">Work Hours</Label>
              <Input
                readOnly
                prefix={
                  <Icon
                    icon="iconamoon:clock-duotone"
                    color="#999"
                    className="mr-1 text-xl"
                  />
                }
                className="my-2 text-md text-text-light"
                placeholder={"work hour"}
                size={"large"}
              />

              <Label className="mt-2 mb-1">Bank</Label>
              <Input
                readOnly
                prefix={
                  <Icon
                    icon="mingcute:bank-card-line"
                    color="#999"
                    className="mr-1 text-xl"
                  />
                }
                className="my-2 text-md text-text-light"
                placeholder={"card info"}
                size={"large"}
              />

              <Label className="mt-2 mb-1">Salary</Label>
              <Input
                readOnly
                prefix={
                  <Icon
                    icon="tabler:currency-taka"
                    color="#999"
                    className="mr-1 text-xl"
                  />
                }
                className="my-2 text-md text-text-light"
                placeholder={"salary"}
                size={"large"}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Overview;
