import { useGetRoles } from "@/queries/roles";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IRoles } from "@pages/Roles/types";
import RoleCard from "../All/components/RoleCard";

const Trash: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetRoles({ ...getQueryParams(), trash: true });
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
export default Trash;
