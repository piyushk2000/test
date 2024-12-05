import { useEffect, useState } from "react";
import { RequestServer } from "../services";
import { APIRoutes } from "../../constants";

type Domains = {
  id: string;
  name: string;
  parent_id: string | null;
  level: string;
  created_at: Date | null;
  updated_at: Date | null;
}[];

export type FormattedDomains = {
  value: string;
  label: string;
  parent_id: string | null;
  level: string;
};

export const useDomainFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState<{ [key: string]: FormattedDomains[] }>(
    {}
  );
  const [serverError, setServerError] = useState<any>(null);

  function getOptionFromLevel(level: string, id?: string){
      if (apiData?.keys?.length !> 0) return []
      if (level === "L0") return apiData["L0"]
      if (!id && id === "") return []
      if (!apiData[level]) return []

    return apiData[level].filter(item => item.parent_id === id)
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let domainsData = await RequestServer(APIRoutes.domains, "GET");
        let formattedDomains = formatDomainsData(domainsData?.data);
        setApiData(formattedDomains);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, apiData, serverError, getOptionFromLevel };
};

const formatDomainsData = (domains: Domains) => {
  let formattedData: { [key: string]: FormattedDomains[] } = {};
  if (domains && domains.length) {
    for (let i = 0; i < domains.length; i++) {
      const item = domains[i];

      const formattedItem = {
        label: item.name,
        value: item.id,
        level: item.level,
        parent_id: item.parent_id,
      };

      if (item.level in formattedData) {
        formattedData[item.level].push(formattedItem);
      } else {
        formattedData[item.level] = [formattedItem];
      }
    }
  }
  return formattedData;
};
