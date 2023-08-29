import useSearchParamsPaginate from "@/hooks/useSearchParamsPaginate";
import { useGetMedia } from "@/queries/media";
import { IMedia } from "@pages/Media/types";
import React from "react";
import MediaCard from "./components/MediaCard";
import { Pagination } from "antd";

const Media: React.FC = () => {
  const { page, setPage, getQueryParams, limit, setLimit } =
    useSearchParamsPaginate();

  const { data } = useGetMedia(getQueryParams());
  const [media, setMedia] = React.useState<any>([]);

  React.useEffect(() => {
    if (!data) return;
    setMedia(data?.data?.data);
  }, [data]);
  return (
    <>
      <div className="py-2">
        {media?.map?.((s: IMedia) => (
          <MediaCard media={s} key={s.id} />
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

export default Media;
