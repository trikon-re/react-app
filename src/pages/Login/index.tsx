import React from "react";

import AuthContext from "@/contexts/AuthContext";
// import { loginResolver } from './resolver';
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Checkbox, Input } from "antd";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

const Login = () => {
  const { login, isLoginLoading } = React.useContext(AuthContext);

  const {
    // reset,
    handleSubmit,
    control,
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const onValid = async ({ phone, password, remember }: FieldValues) => {
    console.log(login);
    login(phone, password, remember);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Controller
          control={control}
          name={"phone"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              prefix={
                <Icon icon="ph:phone" color="#999" className="mr-1 text-xl" />
              }
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
        <Controller
          control={control}
          name={"password"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.Password
              prefix={
                <Icon
                  icon="ri:lock-password-line"
                  color="#999"
                  className="mr-1 text-xl"
                />
              }
              placeholder={"Password"}
              size="large"
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
          name={"remember"}
          render={({ field: { onChange, value } }) => (
            <Checkbox onChange={onChange} checked={value}>
              Remember me
            </Checkbox>
          )}
        />

        {/* <Link to={"/recover"}>
                <Typography variant="caption">Forgot Password?</Typography>
              </Link> */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          type={"submit"}
          disabled={isLoginLoading}
        >
          Log In
        </Button>
      </form>
    </>
  );
};

export default Login;
