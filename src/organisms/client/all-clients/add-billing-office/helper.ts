import { APIRoutes } from "../../../../constants";
import { RequestServer } from "../../../../utils/services";
import { geoTypes, labelValueType } from "../types";

export type addOfficedefaultValues = {
  name: string | null;
  entityName: string | null;
  address: string | null;
  city: string | null;
  country: { label: string; value: string } | null;
  GSTIN?: string | null;
};

export const defaultValues: addOfficedefaultValues = {
  name: null,
  entityName: null,
  address: null,
  city: null,
  country: null,
  GSTIN: null,
};

export const getGeoList = async (setGeoList: any) => {
  try {
    // Geographies API
    const geoResponse = await RequestServer(
      APIRoutes.geographies + "?type=Country",
      "get"
    );
    if (geoResponse.success) {
      const geoOptions: labelValueType[] = geoResponse.data
        .map((geo: geoTypes) => ({
          value: geo.id,
          label: geo.name,
        }))
        .sort((a: labelValueType, b: labelValueType) => {
          return a.label.localeCompare(b.label);
        });

      setGeoList(geoOptions);
    }
  } catch (err) {
    console.log(err);
  }
};
