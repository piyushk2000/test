import { useEffect, useState } from "react";
import { RequestServer } from "../services";
import { formatData } from "../../pages/Projects/helper";
import { FormattedData } from "../../pages/Projects/types";

export const useOptionsFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState<FormattedData>([]);
  const [serverError, setServerError] = useState<any>(null);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let clientsData = await RequestServer(url, "GET");
        const data = formatData(clientsData?.data);
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, serverError };
};
