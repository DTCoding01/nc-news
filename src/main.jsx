import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/body.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ErrorProvider } from "./contexts/ErrorContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <ErrorProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ErrorProvider>
    </UserProvider>
  </BrowserRouter>
);
