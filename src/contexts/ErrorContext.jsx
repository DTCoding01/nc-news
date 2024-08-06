import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export function useError() {
  return useContext(ErrorContext);
}

export function ErrorProvider({ children }) {
  const [error, setError] = useState("");

  const value = {
    error,
    setError,
    clearError: () => setError(""),
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
}
