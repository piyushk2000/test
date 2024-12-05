import { useMemo } from "react";
import { APIRoutes } from "../../constants";
import { useFetch } from "./useFetch";

type labelType = { label: string; value: number };

// sorting India to index 0 in the array
const sortIndiaToTop = (a: any, b: any) => {
  if (a.name === "India") {
    return -1; // "India" comes first
  } else if (b.name === "India") {
    return 1; // "India" comes first
  } else {
    return a.name.localeCompare(b.name); // Sort other countries alphabetically
  }
};

export const useGeoFetch = () => {
  const { data: geoList, loading } = useFetch(APIRoutes.geographies);

  const geographiesList = geoList?.sort(sortIndiaToTop);

  const onlyCountryList: labelType[] = useMemo(() => {
    return geographiesList
      ?.filter((geo: any) => geo.type === "Country")
      ?.map((geo: any) => ({ label: geo.name, value: geo.id }));
  }, [geographiesList]);

  const allGeoList: labelType[] = useMemo(() => {
    return geographiesList?.map((geo: any) => ({
      label: geo.name,
      value: geo.id,
    }));
  }, [geographiesList]);

  const regionList: labelType[] = useMemo(() => {
    return geographiesList
      ?.filter((geo: any) => geo.type === "region")
      ?.map((geo: any) => ({
        label: geo.name,
        value: geo.id,
      }));
  }, [geographiesList]);

  return {
    onlyCountryList,
    allGeoList,
    regionList,
    loading,
  };
};
