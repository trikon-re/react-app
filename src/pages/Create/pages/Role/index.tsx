import { useCreateRole } from "@/queries/roles";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import { Button } from "@mui/material";
import { Divider, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createRole, isLoading: roleCreating } = useCreateRole();

  const { handleSubmit, control, reset } = useForm({
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
        createRole({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Role created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto my-2 px-5 py-3 text-text">
          <h1 className="font-bold text-3xl">Create New Role</h1>
          <Link to={"/app/roles"} className="font-bold text-sm">
            View All Roles
          </Link>
        </div>
        <div className="flex flex-row  mx-auto max-w-5xl">
          <div className="max-w-lg mx-auto">
            <Divider orientation="left">Basic Info</Divider>
            <div className="px-3">
              <Label className="mt-2 mb-1">Name of Role</Label>
              <Controller
                control={control}
                name={"name"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // disabled
                    placeholder={"Role"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />

              <Label className="mt-2 mb-1 ">Prefix</Label>
              <Controller
                control={control}
                name={"prefix"}
                // rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Enter Role Preffix"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />

              <Label className="mt-2 mb-1">Description</Label>
              <Controller
                control={control}
                name={"description"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextArea
                    rows={4}
                    placeholder={"Enter Role Description"}
                    maxLength={200}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
              <Button
                variant="contained"
                fullWidth
                size="large"
                type={"submit"}
                className="mt-5 bg-slate-600 "
                disabled={roleCreating}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Create;
