import React, { createContext, useContext, useState } from 'react';

type contextType = {
    isLoading: boolean,
    showLoading: () => void,
    hideLoading: () => void,
    setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<contextType>({
    isLoading: false,
    showLoading: () => {},
    hideLoading: () => {},
    setLoading: () => {},
  });

export const useFullPageLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }: { children: React.ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, setLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};
