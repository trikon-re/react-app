import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import PropertyCard from "./components/PropertyCard";
import { useGetProperties } from "@/queries/properties";
import { IProperty } from "@pages/Properties/types";

const Properties: React.FC = () => {
  const { getQueryParams } = usePaginate();
  const { data } = useGetProperties(getQueryParams());
  const [properties, setProperties] = React.useState<any>([]);

  React.useEffect(() => {
    if (!data) return;
    setProperties(data?.data?.data);
  }, [data]);

  return (
    <>
      <div className="py-2">
        {properties?.map?.((s: IProperty) => (
          <PropertyCard property={s} key={s.id} />
        ))}
      </div>
    </>
  );
};

export default Properties;
