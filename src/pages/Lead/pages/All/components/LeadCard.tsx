import React from "react";
import { Icon } from "@iconify/react";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import { Dropdown, MenuProps, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import handleResponse from "@/utilities/handleResponse";
// import { useDeleteLead } from "@/queries/leads";
// import { message } from "@components/antd/message";
import { ILeads } from "@pages/Lead/types";

const LeadCard: React.FC<{ lead: ILeads }> = ({ lead }) => {
  const navigate = useNavigate();
  // const { mutateAsync: deleteLead } = useDeleteLead();

  // const onDelete = async (fileName: number) => {
  //   message.open({
  //     type: "loading",
  //     content: "Deleting Lead..",
  //     duration: 0,
  //   });
  //   const res = await handleResponse(() => deleteLead(lead.id));
  //   message.destroy();
  //   if (res.status) {
  //     message.success("Lead deleted successfully!");
  //     return true;
  //   } else {
  //     message.error(res.message);
  //     return false;
  //   }
  // };
  console.log(lead);

  const items: MenuProps["items"] = [
    {
      label: "View details",
      onClick: () => navigate(`/app/info/leads/${lead.id}`),
      key: 1,
      icon: <Icon icon="gg:details-more" className="text-xl" />,
    },
    {
      label: "Delete",
      // onClick: () => onDelete(lead.id),
      key: 2,
      icon: <Icon icon="mi:delete" className="text-xl" />,
      danger: true,
    },
  ];

  return (
    <ListItemButton
      className="hover:bg-[#F6FAFD] rounded-lg py-1 px-2 my-1 overflow-hidden items-start md:items-center gap-4"
      disableRipple
      disableTouchRipple
    >
      {/* <Link to={`/app/info/lead/${lead.id}`}>
        <Avatar
          variant="rounded"
          src={lead?.display_picture}
          {...stringAvatar(`${lead?.first_name} ${lead?.last_name}`)}
          className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-md mt-1"
        />
      </Link> */}
      <div className="flex items-center justify-center md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-md mt-1 bg-[#adad]">
        <p className="font-semibold">{lead?.status?.label}</p>
      </div>
      <ListItemText
        primary={
          <div className="flex flex-row items-center">
            <Link to={`/app/info/leads/${lead.id}`}>
              <p className="text-lg font-medium">{`${lead?.first_name} ${lead?.last_name}`}</p>
            </Link>
          </div>
        }
        secondary={
          <>
            <div className="grid grid-cols-3 justify-between items-center max-w-2xl flex-1">
              <div className="flex flex-row md:items-center py-2 md:py-0 ">
                <div className="flex flex-row  col-span-1 gap-2">
                  <Icon
                    icon="ic:twotone-person-pin"
                    className="text-xl text-text-light"
                  />
                  <p className="text-sm font-semibold text-text-light">
                    {lead?.designation}
                  </p>
                </div>

                {/* Assigned permission list */}
              </div>
              <div className="flex flex-row gap-2 col-span-1 items-center">
                <Icon
                  icon="fluent:building-20-filled"
                  className="text-xl text-text-light"
                />
                <p className="text-sm font-semibold text-text-light">
                  {lead?.company}
                </p>
              </div>
              <div className="flex flex-row gap-2 col-span-1 items-center flex-1">
                <Icon
                  icon="octicon:location-24"
                  className="text-xl text-text-light"
                />
                <p className="text-sm font-semibold text-text-light">
                  {lead?.address_line1}
                </p>
              </div>
            </div>
          </>
        }
        className="p-0 m-0 "
        primaryTypographyProps={{
          className: "text-xl font-medium",
        }}
        secondaryTypographyProps={{
          variant: "caption",
          className: " w-full ",
        }}
        key={lead?.id}
      />
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <IconButton>
              <Icon icon="ph:dots-three-outline-vertical" />
            </IconButton>
          </Space>
        </a>
      </Dropdown>
    </ListItemButton>
  );
};

export default LeadCard;
