import Label from "@components/Label";
import { Divider, Input, Segmented, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Divider as MuiDivider } from "@mui/material";
import { message } from "@components/antd/message";
import { useCreateProperty } from "@/queries/properties";
import handleResponse from "@/utilities/handleResponse";
import useMedia from "@/hooks/useMedia";
import { Icon } from "@iconify/react";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createPropery, isLoading: propertyCreating } =
    useCreateProperty();
  const { media, isMediaLoading, searchMedia } = useMedia();
  const { handleSubmit, control, reset, watch } = useForm({
    // resolver: joiResolver(loginResolver),
  });

  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating property..",
      duration: 0,
    });
    const formattedData = Object.keys(data)
      .map((key) => {
        let name = key.replace("__", ".");
        return { [name]: data[key] };
      })
      .reduce((prev, cur) => {
        prev[Object.keys(cur)[0]] = Object.values(cur)[0];
        return prev;
      }, {});
    const res = await handleResponse(
      () =>
        createPropery({
          ...formattedData,
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
          <Link to={"/app/properties"} className="font-bold text-sm underline">
            View All Properties
          </Link>
        </div>
        <div className="flex md:flex-row flex-col container mx-auto max-w-5xl">
          <div className="w-full">
            <Divider orientation="left">Basic Info</Divider>

            <div className="px-3">
              <div className="flex flex-row">
                <span className="w-2/3">
                  {" "}
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

              <Label isRequired className="mt-2 mb-1 ">
                Property Size
              </Label>
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
                    addonAfter={
                      watch("type") === "FLAT" ? (
                        <div className="text-xs font-semibold">SQFT</div>
                      ) : (
                        <div className="text-xs font-semibold">KATHA</div>
                      )
                    }
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
              <Label isRequired className="mt-2 mb-1 ">
                Property Price
              </Label>
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
                    addonAfter={
                      <Icon
                        className="text-xl text-text"
                        icon={"tabler:currency-taka"}
                      />
                    }
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>
            {watch("type") === "FLAT" ? (
              <>
                <Divider orientation="left">Flat Details</Divider>
                <div className="px-3">
                  <div className="flex flex-row mt-2">
                    <span className="w-1/2">
                      <Label>Floor :</Label>
                    </span>
                    <span>
                      <Label>Apartment No :</Label>
                    </span>
                  </div>
                  <Input.Group compact>
                    <Controller
                      control={control}
                      name={"flat__floor"}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          size="large"
                          placeholder="Floor No."
                          allowClear={false}
                          value={value || undefined}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="w-1/2 border-r-0"
                          status={error ? "error" : ""}

                          //   disabled={isLoading}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={"flat__apt_no"}
                      rules={{ required: false }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          className="w-1/2"
                          placeholder={"Apt. No."}
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
                  <div className="flex flex-row mt-2">
                    <span className="w-1/2">
                      <Label>House :</Label>
                    </span>
                    <span>
                      <Label>Belcony :</Label>
                    </span>
                  </div>
                  <Input.Group compact>
                    <Controller
                      control={control}
                      name={"flat__house_no"}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          size="large"
                          placeholder="House No."
                          allowClear={false}
                          value={value || undefined}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="w-1/2 border-r-0"
                          status={error ? "error" : ""}

                          //   disabled={isLoading}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={"flat__num_balcony"}
                      rules={{ required: false }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          className="w-1/2"
                          placeholder={"Belcony No."}
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
                  <div className="flex flex-row mt-2">
                    <span className="w-1/2">
                      <Label>Bathroom :</Label>
                    </span>
                    <span>
                      <Label>Bedroom :</Label>
                    </span>
                  </div>
                  <Input.Group compact>
                    <Controller
                      control={control}
                      name={"flat__num_bathroom"}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          size="large"
                          placeholder="Bathroom No."
                          allowClear={false}
                          value={value || undefined}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="w-1/2 border-r-0"
                          status={error ? "error" : ""}

                          //   disabled={isLoading}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={"flat__num_bedroom"}
                      rules={{ required: false }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          className="w-1/2"
                          placeholder={"Bedroom No."}
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

                  <Label className="mt-2 mb-1">Flat Direction</Label>
                  <Controller
                    control={control}
                    name={"flat__facing_side"}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        size="large"
                        placeholder="South, East, West, North"
                        allowClear={false}
                        value={value || undefined}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-full "
                        status={error ? "error" : ""}

                        //   disabled={isLoading}
                      />
                    )}
                  />
                </div>
              </>
            ) : (
              ""
            )}
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
                  name={"address__line1"}
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
                  name={"address__line2"}
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
                <div className="flex flex-row mt-2">
                  <span className="w-1/2">
                    <Label>Plot No.</Label>
                  </span>
                  <span>
                    <Label>Road</Label>
                  </span>
                </div>
                <Input.Group compact>
                  <Controller
                    control={control}
                    name={"address__plot"}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        size="large"
                        placeholder="Plot number.."
                        allowClear={false}
                        value={value || undefined}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-1/2 border-r-0"
                        status={error ? "error" : ""}

                        //   disabled={isLoading}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={"address__road"}
                    rules={{ required: false }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        className="w-1/2"
                        placeholder={"Road.."}
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
                <div className="flex flex-row mt-2">
                  <span className="w-1/2">
                    <Label>Sector</Label>
                  </span>
                  <span>
                    <Label>Block</Label>
                  </span>
                </div>
                <Input.Group compact>
                  <Controller
                    control={control}
                    name={"address__sector"}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        size="large"
                        placeholder="Sector.."
                        allowClear={false}
                        value={value || undefined}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-1/2 border-r-0"
                        status={error ? "error" : ""}

                        //   disabled={isLoading}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={"address__block"}
                    rules={{ required: false }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        className="w-1/2"
                        placeholder={"Block.."}
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

                <div className="flex flex-row mt-2">
                  <span className="w-1/2">
                    <Label>Area</Label>
                  </span>
                  <span>
                    <Label>City</Label>
                  </span>
                </div>
                <Input.Group compact>
                  <Controller
                    control={control}
                    name={"address__area"}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        size="large"
                        placeholder="Area.."
                        allowClear={false}
                        value={value || undefined}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-1/2 border-r-0"
                        status={error ? "error" : ""}

                        //   disabled={isLoading}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={"address__city"}
                    rules={{ required: false }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <Input
                        className="w-1/2"
                        placeholder={"City.."}
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
                {watch("type") === "FLAT" ? (
                  <>
                    <Divider orientation="left">
                      Flat Additional Details
                    </Divider>

                    <Label className="mt-2 mb-1">Parking Avaialbe</Label>
                    <Controller
                      control={control}
                      name={"flat__has_parking"}
                      // rules={{ required: true }}
                      defaultValue={"false"}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Segmented
                          block
                          placeholder={"Parking"}
                          size={"large"}
                          className="relative w-full"
                          allowFullScreen
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          options={[
                            { value: "true", label: "True" },
                            { value: "false", label: "False" },
                          ]}
                          onResize={undefined}
                          onResizeCapture={undefined}
                          // status={error ? "error" : ""}
                          // loading={isLoading}
                        />
                      )}
                    />
                    <Label className="mt-2 mb-1">Lift Avaialbe</Label>
                    <Controller
                      control={control}
                      name={"flat__has_lift"}
                      // rules={{ required: true }}
                      defaultValue={"false"}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Segmented
                          block
                          placeholder={"Lift"}
                          size={"large"}
                          className="relative w-full"
                          allowFullScreen
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          options={[
                            { value: "true", label: "True" },
                            { value: "false", label: "False" },
                          ]}
                          onResize={undefined}
                          onResizeCapture={undefined}
                          // status={error ? "error" : ""}
                          // loading={isLoading}
                        />
                      )}
                    />
                    <Label className="mt-2 mb-1">Brand New</Label>
                    <Controller
                      control={control}
                      name={"flat__is_used"}
                      // rules={{ required: true }}
                      defaultValue={"false"}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <Segmented
                          block
                          placeholder={"USed"}
                          size={"large"}
                          className="relative w-full"
                          allowFullScreen
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          options={[
                            { value: "false", label: "True" },
                            { value: "true", label: "False" },
                          ]}
                          onResize={undefined}
                          onResizeCapture={undefined}
                          // status={error ? "error" : ""}
                          // loading={isLoading}
                        />
                      )}
                    />
                  </>
                ) : (
                  ""
                )}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  type={"submit"}
                  className="mt-5 bg-slate-600"
                  disabled={propertyCreating}
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
