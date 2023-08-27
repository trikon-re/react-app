import { useGetRoles } from "@/queries/roles";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import RoleCard from "./components/RoleCard";
import { IRoles } from "@pages/Roles/types";

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
