import React from "react";
import { useError } from "../../contexts/ErrorContext";
import ErrorCard from "../ErrorCard";

export default function ErrorPage() {
  const { error, clearError } = useError();

  return (
    <div className="error-page" role="alert" aria-live="assertive">
      {error && (
        <ErrorCard
          message={error}
          onClose={clearError}
          aria-label="Error message"
          role="alertdialog"
        />
      )}
    </div>
  );
}
