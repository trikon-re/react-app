import React from "react";
// import Label from "@components/Label";
// import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Tag,
  //  Input, Segmented,  DatePicker
} from "antd";
import {
  Avatar,
  // Button,
  // IconButton,
  // Divider as MuiDivider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
// import {
//   useGetEmployeesById,
//   useUpdateEmployeesById,
// } from "@/queries/employees";
// import { stringAvatar } from "@/utilities/stringAvatar";
// import handleResponse from "@/utilities/handleResponse";
// import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
// import * as dayjs from "dayjs";
// import { Button as AntButton } from "antd";
import { useGetPropertiesById } from "@/queries/properties";
import { useGetMediaById } from "@/queries/media";

const Overview: React.FC = () => {
  const params = useParams();
  // const [messageApi, contextHolder] = message.useMessage();
  // const {
  //   reset,
  //   handleSubmit,
  //   control,
  //   formState: { isDirty },
  // } = useForm({});
  const { data } = useGetPropertiesById(params.id);
  const [propertyInfo, setPropertyInfo] = React.useState<any>([]);
  // const { mutateAsync: updateEmployee, isLoading: isSubmitting } =
  //   useUpdateEmployeesById();
  const { data: mediaData } = useGetMediaById(propertyInfo?.media_id);
  React.useEffect(() => {
    if (!data) return;
    setPropertyInfo(data?.data?.data);
  }, [data]);

  console.log(mediaData);

  // React.useEffect(() => {
  //   if (!employeeInfo || isDirty) return;
  //   reset({
  //     first_name: employeeInfo?.firstName,
  //     last_name: employeeInfo?.lastName,
  //     phone: employeeInfo?.phone,
  //     email: employeeInfo?.email,
  //     gender: employeeInfo?.gender,
  //     dob: employeeInfo?.dob,
  //     hired_date: employeeInfo?.hired_date,
  //     max_session: employeeInfo?.max_session,
  //     work_hour: employeeInfo?.work_hour,
  //     salary: employeeInfo?.salary,
  //     bank: employeeInfo?.bank,
  //     address: employeeInfo?.address,
  //     display_picture: employeeInfo?.display_picture,
  //     role_id: employeeInfo?.role?._id,
  //   });
  // }, [employeeInfo]);

  // const onValid = async (d: FieldValues) => {
  //   messageApi.open({
  //     type: "loading",
  //     content: `Updating information...`,
  //     duration: 0,
  //   });
  //   const res = await handleResponse(
  //     () =>
  //       updateEmployee({
  //         id: params?.id,
  //         data: d,
  //       }),
  //     [200]
  //   );
  //   messageApi.destroy();
  //   if (res.status) messageApi.success("Information updated successfully!");
  //   else messageApi.error(res.message);
  // };
  return (
    <>
      {/* {contextHolder} */}
      {/* <form onSubmit={handleSubmit(onValid)}> */}
      <div className="grid grid-cols-3 divide-x-2 container mx-auto max-w-5xl">
        <div className="relative col-span-2 w-full pt-5  min-h-[100px] md:min-h-[300px]">
          <Avatar
            src={""}
            variant="rounded"
            className="relative w-full rounded-2xl h-auto bg-slate-300  min-h-[100px] md:min-h-[300px]"
          >
            <Iconify
              icon={"mdi:image-text"}
              className="text-8xl text-slate-50"
            />
          </Avatar>
          <span className="flex flex-row items-center gap-1">
            <span className="flex flex-row items-end gap-3">
              <p className="text-lg font-bold text-text-light pt-3"> BDT </p>
              <p className="text-3xl font-bold text-text-light pt-3">
                {propertyInfo?.price}
              </p>
            </span>
            <Icon className="text-xl text-text" icon={"tabler:currency-taka"} />
          </span>
          <span className="flex flex-row items-center gap-1 flex-wrap mt-2">
            <Icon className="text-lg text-text-light" icon="entypo:address" />
            <p className="text-sm font-semibold text-text-light">
              {`${propertyInfo?.["address.plot"]} ${propertyInfo?.["address.road"]}, ${propertyInfo?.["address.sector"]}, ${propertyInfo?.["address.block"]}, ${propertyInfo?.["address.area"]}, ${propertyInfo?.["address.city"]}`}
            </p>
          </span>
          <span>
            {propertyInfo?.description ? (
              <p className="text-sm font-medium text-text-light text-justify pt-3">
                propertyInfo?.description
              </p>
            ) : (
              <p className="text-sm font-medium text-text-light text-justify pt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
                Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                sapiente officiis modi at sunt excepturi expedita sint? Sed
                quibusdam recusandae alias error harum maxime adipisci amet
                laborum.
              </p>
            )}
          </span>
        </div>
        <div className="mx-5 w-full px-4">
          <p className="text-xl font-bold text-text-light pt-5">
            Property Information
          </p>
          <div>
            <div className="flex flex-row pt-3 text-text gap-3 ">
              <span className="flex flex-row items-center gap-1">
                {propertyInfo?.type === "FLAT" ? (
                  <>
                    <Icon
                      className="text-2xl text-text"
                      icon={"fluent:building-20-filled"}
                    />
                  </>
                ) : propertyInfo?.type === "LAND" ? (
                  <>
                    <Icon className="text-2xl text-text" icon={"mdi:island"} />
                  </>
                ) : (
                  ""
                )}
                <p className="text-md font-bold text-text capitalize">
                  {propertyInfo?.type?.toLowerCase()}
                </p>
              </span>
              <span className="flex flex-row items-center gap-1">
                <Icon
                  className="text-xl"
                  icon={"fluent:slide-size-20-regular"}
                />
                <p className="text-md font-bold text-text">
                  {propertyInfo?.size}
                </p>
                <p className="text-md font-bold text-text capitalize">
                  {propertyInfo?.size_unit?.toLowerCase()}.
                </p>
              </span>
              <span className="flex flex-row">
                <Tag
                  color="#76C6D1"
                  className="rounded-xl w-fit text-center px-4 "
                >
                  {propertyInfo?.type?.[0]}-{propertyInfo?.id}
                </Tag>
              </span>
            </div>
            <div className="flex flex-row pt-3 gap-3 ">
              <span className="flex flex-row items-center gap-1">
                <Icon
                  className="text-2xl text-text-light"
                  icon={"tabler:address-book"}
                />
                <p className="text-sm font-bold text-text-light">
                  {`${mediaData?.data?.data?.first_name} ${mediaData?.data?.data?.last_name}`}
                </p>
              </span>
              <span className="flex flex-row items-center gap-1">
                <Icon
                  icon="mingcute:bed-fill"
                  className="text-xl text-text-light"
                />
                <p className="text-sm font-semibold text-text-light">
                  {propertyInfo?.["flat.num_bedroom"]}
                </p>
              </span>
              <span className="flex flex-row items-center gap-1">
                <Icon icon="fa:bath" className="text-sm text-text-light" />
                <p className="text-md font-semibold text-text-light">
                  {propertyInfo?.["flat.num_bathroom"]}
                </p>
              </span>
            </div>
            <div className="flex flex-row pt-3 gap-3 ">
              <span className="flex flex-row items-center gap-1">
                <Icon
                  className="text-xl text-text-light"
                  icon="solar:compass-big-bold"
                />
                <p className="text-sm font-semibold text-text-light">
                  {propertyInfo?.["flat.facing_side"]}
                </p>
              </span>

              <span className="flex flex-row items-center gap-1 flex-wrap">
                <Icon
                  className="text-xl text-text-light"
                  icon="entypo:address"
                />
                <p className="text-sm font-semibold text-text-light">
                  {propertyInfo?.["address.area"]},{" "}
                  {propertyInfo?.["address.city"]}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* </form> */}
    </>
  );
};

export default Overview;
