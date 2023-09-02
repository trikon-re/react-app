import Label from "@components/Label";
import { Divider, Input, Segmented } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Divider as MuiDivider } from "@mui/material";
import { message } from "@components/antd/message";
import { useCreateProperty } from "@/queries/properties";
import handleResponse from "@/utilities/handleResponse";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createPropery, isLoading: propertyCreating } =
    useCreateProperty();
  const { handleSubmit, control, reset, watch } = useForm({
    // resolver: joiResolver(loginResolver),
  });

  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating property..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createPropery({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Property created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };
  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto my-2 px-5 py-4 text-text">
          <h1 className="font-bold text-3xl">Create New Property</h1>
          <Link to={"/app/media"} className="font-bold text-sm underline">
            View All Properties
          </Link>
        </div>
        <div className="flex md:flex-row flex-col container mx-auto max-w-5xl">
          <div className="w-full">
            <Divider orientation="left">Basic Info</Divider>
            <div className="px-3">
              <Label isRequired className="mt-2 mb-1">
                Property Type
              </Label>
              <Controller
                control={control}
                name={"type"}
                rules={{ required: true }}
                defaultValue={"LAND"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Segmented
                    block
                    placeholder={"Type"}
                    size={"large"}
                    className="relative w-full"
                    allowFullScreen
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={[
                      { value: "LAND", label: "Land" },
                      { value: "FLAT", label: "Flat" },
                    ]}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    // status={error ? "error" : ""}
                    // loading={isLoading}
                  />
                )}
              />
              {/* {watch("type") === "FLAT" ? "SQFT" : "KATHA"} */}

              {/* <Label isRequired>Full Name</Label>
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
              </Input.Group> */}
              <Label className="mt-2 mb-1 ">Size</Label>
              <Controller
                control={control}
                name={"size"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Size of the Property"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    addonAfter={watch("type") === "FLAT" ? "SQFT" : "KATHA"}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
              <Label className="mt-2 mb-1 ">Price</Label>
              <Controller
                control={control}
                name={"price"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Price"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    addonAfter={watch("type") === "FLAT" ? "SQFT" : "KATHA"}
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
              {/* <Label isRequired className="mt-2 mb-1">
                Date of Birth
              </Label>
              <Controller
                control={control}
                name={"dob"}
                // rules={{}}
                defaultValue={dayjs()}
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
              /> */}
            </div>
          </div>
          <MuiDivider flexItem orientation="vertical" className="mt-7" />
          <div className="w-full">
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
                  //   disabled={mediaCreating}
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
