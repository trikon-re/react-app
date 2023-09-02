import { useGetLeads } from "@/queries/leads";
import React from "react";
import LeadCard from "./components/LeadCard";
import useSearchParamsPaginate from "@/hooks/useSearchParamsPaginate";
import { Pagination } from "antd";
import { ILeads } from "@pages/Lead/types";

const Leads: React.FC = () => {
  const { page, setPage, getQueryParams, limit, setLimit } =
    useSearchParamsPaginate();

  const { data } = useGetLeads(getQueryParams());
  const [leads, setLeads] = React.useState<any>([]);

  React.useEffect(() => {
    if (!data) return;
    setLeads(data?.data?.data);
  }, [data]);
  // console.log(data);
  return (
    <>
      <div className="py-2">
        {leads?.map?.((s: ILeads) => (
          <LeadCard lead={s} key={s.id} />
        ))}

        <div className="flex flex-row justify-end">
          <Pagination
            total={data?.data?.total}
            onChange={(p, ps) => {
              setPage(p);
              setLimit(ps);
            }}
            current={page}
            pageSize={limit}
            showSizeChanger
            pageSizeOptions={[2, 5, 10, 20, 50, 100, 500]}
          />
        </div>
      </div>
    </>
  );
};
export default Leads;
