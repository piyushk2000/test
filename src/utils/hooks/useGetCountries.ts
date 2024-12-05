import { countries } from "../countries";

export interface CountryData {
  name: string;
  currency: string;
  iso2: string;
  iso3: string;
}

export const useGetCountries = () => {
  const data = countries;

  return {
    loading: false,
    data: formatData(data),
    error: null,
    rawData: data || [],
  };
};

function formatData(data: CountryData[]) {
  if (!data) return [];
  return data.map((item) => item.name);
}
