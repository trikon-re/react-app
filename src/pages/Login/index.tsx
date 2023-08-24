import React from "react";

import AuthContext from "@/contexts/AuthContext";
// import { loginResolver } from './resolver';
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Checkbox, Input, Typography } from "antd";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import logo from "/assests/logo.png";

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
      <section className="h-screen lg:p-20 bg-gradient-to-br from-[#C5F6F9]  to-[#E8EAFB] ">
        <div className="container mx-auto h-full bg-white drop-shadow-xl flex flex-row items-center justify-between max-w-3xl rounded-md overflow-hidden">
          {/* Left column  */}
          <div className="w-[80%] h-full bg-[#E8FFF8] flex flex-col items-center justify-between drop-shadow-xl">
            <div></div>
            <img src={logo} className="w-20" alt="" />
            <Typography
              className={
                "text-center text-[10px] font-medium tracking-wider pb-10"
              }
            >
              We do believe in Creation, Not Construction
            </Typography>
          </div>

          {/* right column */}
          <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <Typography
              className={
                "mb-8 text-center text-2xl font-semibold tracking-widest"
              }
            >
              WELCOME
            </Typography>

            <form onSubmit={handleSubmit(onValid)} className="max-w-xs">
              <Controller
                control={control}
                name={"phone"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Typography className="tracking-wide">
                      Phone Number
                    </Typography>
                    <Input
                      prefix={
                        <Icon
                          icon="ph:phone"
                          color="#999"
                          className="mr-1 text-xl"
                        />
                      }
                      className="my-2"
                      placeholder={"Enter Phone Number"}
                      size={"large"}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                      //   suffix={<ErrorSuffix error={error} />}
                    />
                  </>
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
                  <>
                    <Typography className="tracking-wide">
                      Password
                      {/* <ErrorSuffix error={error} size="small" /> */}
                    </Typography>
                    <Input.Password
                      prefix={
                        <Icon
                          icon="ri:lock-password-line"
                          color="#999"
                          className="mr-1 text-xl"
                        />
                      }
                      className="my-2"
                      placeholder={"Enter Password"}
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                      //   suffix={<ErrorSuffix error={error} />}
                    />
                  </>
                )}
              />

              <Button
                className="mt-2 uppercase bg-slate-600"
                variant="contained"
                fullWidth
                size="large"
                type={"submit"}
                disabled={isLoginLoading}
              >
                LogIn
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
