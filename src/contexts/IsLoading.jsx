import React, { createContext, useContext, useState } from "react";

const IsLoadingContext = createContext();

export function useIsLoading() {
  return useContext(IsLoadingContext);
}

export function IsLoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <IsLoadingContext.Provider value={value}>
      {children}
    </IsLoadingContext.Provider>
  );
}
