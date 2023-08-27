import { useGetRoles } from "@/queries/roles";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import RoleCard from "./components/RoleCard";
import { IRoles } from "@pages/Roles/types";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Roles: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetRoles(getQueryParams());
  const [roles, setRoles] = React.useState<any>([]);

  React.useEffect(() => {
    if (!data) return;
    setRoles(data?.data?.data);
  }, [data]);

  return (
    <>
      <div className="py-2">
        {roles?.map?.((s: IRoles) => (
          <RoleCard role={s} key={s.id} />
        ))}
      </div>
    </>
  );
};
export default Roles;
