import Label from "@components/Label";
import { Input, Tag } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Avatar, IconButton, Divider as MuiDivider } from "@mui/material";
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
import moment from "moment";

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
      [201]
    );
    messageApi.destroy();
    if (res.status) messageApi.success("Information updated successfully!");
    else messageApi.error(res.message);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex md:flex-row flex-col container mx-auto max-w-5xl">
          <div className="w-full p-3">
            <Avatar
              variant="rounded"
              src={employeeInfo?.display_picture}
              {...stringAvatar(
                `${employeeInfo?.first_name} ${employeeInfo?.last_name}`
              )}
              className="float-left w-[100px] h-[100px]  rounded-xl  m-2 "
            />

            <div className="flex flex-col gap-2 items-start px-2">
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
                  className="mt-2"
                  placeholder={employeeInfo?.address}
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
              placeholder={employeeInfo?.phone}
              size={"large"}
            />
            {/* Email */}
            <Input
              readOnly
              className="my-2 text-md"
              placeholder={employeeInfo?.email}
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
                placeholder={moment(employeeInfo?.dob).format("L")}
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
                placeholder={employeeInfo?.gender}
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
                placeholder={employeeInfo?.work_hour}
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
                placeholder={employeeInfo?.bank}
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
                placeholder={employeeInfo?.salary}
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
