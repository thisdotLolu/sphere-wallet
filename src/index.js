import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { WalletContextProvider } from "./context/WalletContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WalletContextProvider>
    <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>
  </WalletContextProvider>
);