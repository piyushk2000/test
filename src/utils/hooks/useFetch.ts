import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RequestServer } from "../services";

export type PaginationData = {
  total: number | null;
  page: number | null;
  totalPages: number | null;
};

export type TApiResponse<T, R> = {
  success: boolean;
  message: string;
  data: T | null;
  error: any;
  loading: boolean;
  refetch: () => Promise<void>;
  refetchWithNewUrl: (url: string) => Promise<void>;
  formattedData: R | null;
  setData: Dispatch<SetStateAction<T | null>>;
  pagination: PaginationData;
  setFormattedData: Dispatch<SetStateAction<R | null>>;
};

type OptionalParams<T, R> = {
  setLoading?: (loading: boolean) => void;
  formatter?: (data: T) => R;
  asyncFormatter?: (data: T) => Promise<R>;
  variables?: Array<String | number | null | boolean>;
  disabled?: boolean;
};

export const useFetch = <T = any, R = any>(
  url: string,
  configs?: OptionalParams<T, R>
): TApiResponse<T, R> => {
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formattedData, setFormattedData] = useState<R | null>(null);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    total: null,
    page: null,
    totalPages: null,
  });

  const getAPIData = async (url: string) => {
    setSuccess(false);
    setMessage("");
    setData(null);
    setFormattedData(null);
    setError(null);
    setLoading(true);

    if (configs && configs.setLoading) {
      configs.setLoading(true);
    }

    /* REASON TO ADD an array config.variables , 
      because: In some cases , useFetch is calling the server even when the url contain some variable
      with null value in it.
    */
    let isVariableNull = false;

    if (configs?.variables && configs.variables.length > 0) {
      configs.variables.forEach((variable) => {
        if (!variable) {
          isVariableNull = true;
        }
      });
    }

    if (isVariableNull) {
      setLoading(false);
      if (configs && configs.setLoading) {
        configs.setLoading(false);
      }
      return;
    }

    try {
      const apiResponse = await RequestServer(url, "GET");
      setSuccess(apiResponse.success);
      setMessage(apiResponse.message);
      setData(apiResponse.data);

      if (apiResponse?.total) {
        setPaginationData((prev) => ({
          ...prev,
          total: apiResponse.total,
        }));
      }

      if (apiResponse?.page) {
        setPaginationData((prev) => ({
          ...prev,
          page: apiResponse?.page,
        }));
      }

      if (apiResponse?.totalPages) {
        setPaginationData((prev) => ({
          ...prev,
          totalPages: apiResponse?.totalPages,
        }));
      }

      if (configs && configs.formatter) {
        setFormattedData(configs.formatter(apiResponse.data));
      }

      if (configs && configs.asyncFormatter) {
        setFormattedData(await configs.asyncFormatter(apiResponse.data));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      if (configs && configs.setLoading) {
        configs.setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!configs?.disabled) {
      getAPIData(url);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, configs?.disabled]);

  return {
    success,
    message,
    data,
    error,
    loading,
    refetch: async () => await getAPIData(url),
    refetchWithNewUrl: async (url: string) => await getAPIData(url),
    formattedData,
    setData,
    pagination: paginationData,
    setFormattedData,
  };
};
