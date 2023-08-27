import Label from "@components/Label";
import { Divider, Input, Tag } from "antd";
import { Controller, useForm } from "react-hook-form";
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

const Overview: React.FC = () => {
  return (
    <>
      <div className="flex flex-row container mx-auto max-w-5xl">
        <div className="w-full">
          <div className="flex flex-row  rounded-lg  px-2 my-5 overflow-hidden items-start md:items-center gap-4 ">
            <Avatar
              variant="rounded"
              // src={employee?.display_picture}
              // {...stringAvatar(
              //   `${employee?.first_name} ${employee?.last_name}`
              // )}
              className="md:w-[120px] md:h-[120px] w-[60px] h-[60px] rounded-xl mt-1"
            />
            <ListItemText
              primary={
                <div className="flex flex-row gap-4 items-center ">
                  {" "}
                  <p className="text-3xl font-semibold text-text-dark">
                    August Tylor
                  </p>
                  <IconButton>
                    <Icon
                      className="text-text-dark"
                      icon="material-symbols:edit-outline"
                    />
                  </IconButton>
                </div>
              }
              secondary={
                <>
                  <p className="text-sm font-medium text-text-light">
                    Call Center Executive
                    <br />
                    <span>@tylor</span>
                  </p>
                  <Tag
                    color="#087890"
                    className="flex flex-row gap-1 items-center  w-20 my-2"
                  >
                    Verified
                    <Icon icon="ic:round-verified" />
                  </Tag>
                </>
              }
              className="p-0 m-0 "
              primaryTypographyProps={{
                className: "text-xl font-medium",
              }}
              secondaryTypographyProps={{
                variant: "caption",
                className: " w-full py-1",
              }}
            />
          </div>
          <div className="px-3">
            {/* Address */}
            <TextArea
              readOnly
              rows={4}
              placeholder="address"
              style={{ height: 120, resize: "none" }}
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
    </>
  );
};

export default Overview;
