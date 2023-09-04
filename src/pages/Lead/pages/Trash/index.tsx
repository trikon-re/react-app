import { useGetLeads } from "@/queries/leads";
import React from "react";
import useSearchParamsPaginate from "@/hooks/useSearchParamsPaginate";
import { Pagination } from "antd";
import { ILeads } from "@pages/Lead/types";
import LeadCard from "../All/components/LeadCard";

const Trash: React.FC = () => {
	const { page, setPage, getQueryParams, limit, setLimit } =
		useSearchParamsPaginate();

	const { data } = useGetLeads({
		...getQueryParams(),
		trash: true,
	});

	const [leads, setLeads] = React.useState<any>([]);

	React.useEffect(() => {
		if (!data) return;
		setLeads(data?.data?.data);
	}, [data]);

	return (
		<>
			<div className="py-2">
				{leads?.map?.((s: ILeads) => (
					<LeadCard
						lead={s}
						key={s.id}
					/>
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
export default Trash;
