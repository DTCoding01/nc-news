import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/body.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ErrorProvider } from "./contexts/ErrorContext.jsx";
import { IsLoadingProvider } from "./contexts/IsLoading.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <ErrorProvider>
        <IsLoadingProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </IsLoadingProvider>
      </ErrorProvider>
    </UserProvider>
  </BrowserRouter>
);
