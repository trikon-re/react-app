import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import MediaCard from "../All/components/MediaCard";
import { useGetMedia } from "@/queries/media";
import { IMedia } from "@pages/Media/types";

const Trash: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetMedia({ ...getQueryParams(), trash: true });
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
      </div>
    </>
  );
};
export default Trash;
