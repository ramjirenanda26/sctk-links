import React from "react";
import ReactDOM from "react-dom/client";
import { UserAuthContextProvider } from "./Context/AuthContext";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
  </React.StrictMode>
);
